import { Injectable, OnModuleInit } from '@nestjs/common';
import { CoinsService } from './coins/coins.service';
import { BitcoinDaily, BitcoinMonthly } from './coins/bitcoin/bitcoin.models';
import { EthereumDaily, EthereumMonthly } from './coins/ethereum/ethereum.models';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

@Injectable()
export class StartupService implements OnModuleInit {
    constructor(private readonly bitcoinService: CoinsService, private httpService: HttpService) {}

    async onModuleInit() {
        // Parsing historical data saved from investing.com
        if ((await this.bitcoinService.countDocuments(BitcoinMonthly.name, {})) === 0)
            await this.parseHistoricalData('bitcoin.csv', BitcoinMonthly.name, BitcoinDaily.name);
        if ((await this.bitcoinService.countDocuments(EthereumMonthly.name, {})) === 0)
            await this.parseHistoricalData('ethereum.csv', EthereumMonthly.name, EthereumDaily.name);
    }

    async parseHistoricalData(source: string, modelMonthly: string, modelDaily: string) {
        try {
            console.log(`Parsing ${source} ...`);
            const parser = parse({ columns: true, trim: true, bom: true });
            const inputFilePath = path.join(__dirname, '../src/historical_data', source);
            const inputStream = fs.createReadStream(inputFilePath);
            const dataToWrite = {};
            const dailysToWrite = [];
            let firstRow;
            // Save last 60 days in DB
            const lastNdaysBoundary = new Date().getTime() / 1000 - 60 * 24 * 3600;
            inputStream
                .pipe(parser)
                .on('data', (row) => {
                    const [month, day, year] = row.Date.split('/');
                    const date = new Date(`${year}-${month}-${day}`);
                    const monthlyTimestamp = new Date(`${year}-${month}-01`).getTime() / 1000;

                    if (!firstRow) {
                        firstRow = row;
                        firstRow.Date = date; //
                    }

                    if (!dataToWrite[monthlyTimestamp]) {
                        dataToWrite[monthlyTimestamp] = {};
                        dataToWrite[monthlyTimestamp].count = 1;
                        dataToWrite[monthlyTimestamp].sum = Number(row.Price.toString().replace(',', ''));
                        dataToWrite[monthlyTimestamp].value = Number(row.Price.toString().replace(',', ''));
                        dataToWrite[monthlyTimestamp].timestamp = monthlyTimestamp;
                    } else {
                        dataToWrite[monthlyTimestamp].count++;
                        dataToWrite[monthlyTimestamp].sum += Number(row.Price.toString().replace(',', ''));
                        dataToWrite[monthlyTimestamp].value = parseFloat(
                            (dataToWrite[monthlyTimestamp].sum / dataToWrite[monthlyTimestamp].count).toFixed(2),
                        );
                    }

                    if (date.getTime() / 1000 > lastNdaysBoundary) {
                        dailysToWrite.push({
                            value: Number(row.Price.toString().replace(',', '')),
                            timestamp: new Date(date).getTime() / 1000,
                        });
                    }
                })
                .on('end', async () => {
                    // Get missing days from coingecko until today
                    const diff = new Date().getTime() - new Date(firstRow.Date).getTime();
                    const differenceInDays = Math.floor(diff / (24 * 60 * 60 * 1000));
                    let coinName = '';
                    switch (modelMonthly) {
                        case BitcoinMonthly.name:
                            coinName = 'bitcoin';
                            break;
                        case EthereumMonthly.name:
                            coinName = 'ethereum';
                            break;
                        default:
                            throw new Error('Unsupported coin');
                    }
                    if (differenceInDays > 0) {
                        const data = (
                            await this.httpService.axiosRef(
                                `https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=usd&days=${differenceInDays}&interval=daily&precision=2`,
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

                    await this.bitcoinService.insert(modelMonthly, Object.values(dataToWrite));
                    await this.bitcoinService.insert(modelDaily, Object.values(dailysToWrite));
                    console.log(`Finished parsing ${source} ...`);
                });
        } catch (e) {
            console.log(e);
        }
    }
}
