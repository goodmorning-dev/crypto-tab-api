import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinsService } from '../coins/coins.service';
import { SupportedCoins } from '../coins/coins.registry';

@Injectable()
export class PricesCron {
    constructor(private coinsService: CoinsService, private httpService: HttpService) {}

    private coingecko_ids = SupportedCoins.map((coin) => coin.coingecko_id).join(',');

    @Cron(CronExpression.EVERY_5_MINUTES)
    async getCurrentPrice() {
        const data = (
            await this.httpService.axiosRef(
                `https://api.coingecko.com/api/v3/simple/price?ids=${this.coingecko_ids}&vs_currencies=usd`,
            )
        ).data;
        console.log(data);
        await Promise.allSettled(
            SupportedCoins.map((coin) => this.coinsService.create(coin.Values, { value: data[coin.coingecko_id].usd })),
        );

        // Update hourly prices
        const UTCtimestamp = Date.now() / 1000;
        const roundHourUTCtimestamp = UTCtimestamp - (UTCtimestamp % 3600);

        await Promise.allSettled(
            SupportedCoins.map((coin) =>
                this.updateData(coin.Values, coin.Hourly, coin.precision, roundHourUTCtimestamp),
            ),
        );
    }

    @Cron('00 59 * * * *')
    async updateDailyAverages() {
        const UTCtimestamp = Date.now() / 1000;
        const roundDayUTCtimestamp = UTCtimestamp - (UTCtimestamp % (24 * 3600));

        await Promise.allSettled(
            SupportedCoins.map((coin) =>
                this.updateData(coin.Hourly, coin.Daily, coin.precision, roundDayUTCtimestamp),
            ),
        );
    }

    @Cron('00 55 23 * * *')
    async updateMonthlyAverages() {
        const year = new Date().getUTCFullYear();
        const month = new Date().getUTCMonth() + 1;
        const monthlyTimestamp = new Date(`${year}-${month.toString().padStart(2, '0')}-01`).getTime() / 1000;

        await Promise.allSettled(
            SupportedCoins.map((coin) => this.updateData(coin.Daily, coin.Monthly, coin.precision, monthlyTimestamp)),
        );
    }

    async updateData(modelSource: string, modelTarget: string, precision: number, timestamp: number) {
        const data = await this.coinsService.find(modelSource, {
            timestamp: {
                $gte: timestamp,
            },
        });

        const avgPrice = this.coinsService.getDataAveragePrice(data, precision);

        if (avgPrice === null) return;

        await this.coinsService.update(modelTarget, { timestamp }, { timestamp, value: avgPrice });
    }
}
