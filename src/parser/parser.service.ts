import { Injectable, OnModuleInit } from '@nestjs/common';
import { CoinsService } from '../coins/coins.service';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import { Coin, SupportedCoins } from '../coins/coins.registry';

@Injectable()
export class ParserService implements OnModuleInit {
    constructor(private readonly coinsService: CoinsService, private httpService: HttpService) {}

    async onModuleInit() {
        // Parsing historical data from csv
        for (const coin of SupportedCoins) {
            if ((await this.coinsService.countDocuments(coin.Monthly, {})) === 0) {
                await this.parseHistoricalData(coin);
            }
        }
    }

    async parseHistoricalData(coin: Coin) {
        try {
            console.log(`Parsing ${coin.csv_data} ...`);
            const parser = parse({ columns: true, trim: true, bom: true });
            const inputFilePath = path.join(__dirname, '../../src/historical_data', coin.csv_data);
            const inputStream = fs.createReadStream(inputFilePath);
            const dataToWrite = {};
            const dailysToWrite = [];
            let firstRowDate: Date;
            let lastRowDate: Date;

            // Save last 60 days in DB
            const lastNdaysBoundary = Date.now() / 1000 - 60 * 24 * 3600;
            inputStream
                .pipe(parser)
                .on('data', (row) => {
                    const cvsPriceField = coin.csv_data_source === 'investing.com' ? 'Price' : 'price';
                    let month: string, day: string, year: string;
                    if (coin.csv_data_source === 'investing.com') {
                        [month, day, year] = row.Date.split('/');
                    } else if (coin.csv_data_source === 'coingecko.com') {
                        [year, month, day] = row.snapped_at.slice(0, 10).split('-');
                    }

                    const date = new Date(`${year}-${month}-${day}`);
                    const monthlyTimestamp = new Date(`${year}-${month}-01`).getTime() / 1000;

                    if (!firstRowDate) {
                        firstRowDate = date;
                    }

                    lastRowDate = date;

                    if (!dataToWrite[monthlyTimestamp]) {
                        dataToWrite[monthlyTimestamp] = {};
                        dataToWrite[monthlyTimestamp].count = 1;
                        dataToWrite[monthlyTimestamp].sum = Number(row[cvsPriceField].toString().replace(',', ''));
                        dataToWrite[monthlyTimestamp].value = Number(row[cvsPriceField].toString().replace(',', ''));
                        dataToWrite[monthlyTimestamp].timestamp = monthlyTimestamp;
                    } else {
                        dataToWrite[monthlyTimestamp].count++;
                        dataToWrite[monthlyTimestamp].sum += Number(row[cvsPriceField].toString().replace(',', ''));
                        dataToWrite[monthlyTimestamp].value = parseFloat(
                            (dataToWrite[monthlyTimestamp].sum / dataToWrite[monthlyTimestamp].count).toFixed(
                                coin.precision,
                            ),
                        );
                    }

                    if (date.getTime() / 1000 > lastNdaysBoundary) {
                        dailysToWrite.push({
                            value: Number(row[cvsPriceField].toString().replace(',', '')).toFixed(coin.precision),
                            timestamp: new Date(date).getTime() / 1000,
                        });
                    }
                })
                .on('end', async () => {
                    // Get missing days from coingecko until today
                    const diff =
                        coin.csv_data_source === 'investing.com'
                            ? Date.now() - new Date(firstRowDate).getTime()
                            : Date.now() - new Date(lastRowDate).getTime();
                    const differenceInDays = Math.floor(diff / (24 * 60 * 60 * 1000));

                    if (differenceInDays > 0) {
                        const data = (
                            await this.httpService.axiosRef(
                                `https://api.coingecko.com/api/v3/coins/${coin.name}/market_chart?vs_currency=usd&days=${differenceInDays}&interval=daily&precision=${coin.precision}`,
                            )
                        ).data;

                        const prices = data.prices;
                        prices.pop();
                        for (const price of prices) {
                            console.log(price[0], price[1]);
                            dailysToWrite.unshift({
                                value: price[1],
                                timestamp: price[0] / 1000,
                            });
                        }
                    }

                    await this.coinsService.insert(coin.Monthly, Object.values(dataToWrite));
                    await this.coinsService.insert(coin.Daily, Object.values(dailysToWrite));
                    console.log(`Finished parsing ${coin.csv_data} ...`);
                });
        } catch (e) {
            console.log(e);
        }
    }
}
