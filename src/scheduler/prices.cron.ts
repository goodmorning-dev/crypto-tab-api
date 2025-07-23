import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinsService } from '../coins/coins.service';
import { BitcoinDaily, BitcoinHourly, BitcoinMonthly, BitcoinValues } from '../coins/bitcoin/bitcoin.models';
import { EthereumDaily, EthereumHourly, EthereumMonthly, EthereumValues } from '../coins/ethereum/ethereum.models';

@Injectable()
export class PricesCron {
    constructor(private coinsService: CoinsService, private httpService: HttpService) {}

    private coins = 'bitcoin,ethereum';

    @Cron(CronExpression.EVERY_5_MINUTES)
    async getCurrentPrice() {
        const data = (
            await this.httpService.axiosRef(
                `https://api.coingecko.com/api/v3/simple/price?ids=${this.coins}&vs_currencies=usd`,
            )
        ).data;
        console.log(data);
        await this.coinsService.create(BitcoinValues.name, {
            value: data.bitcoin.usd,
        });
        await this.coinsService.create(EthereumValues.name, {
            value: data.ethereum.usd,
        });

        // Update hourly prices
        const UTCtimestamp = new Date().getTime() / 1000;
        const roundHourUTCtimestamp = UTCtimestamp - (UTCtimestamp % 3600);

        await this.updateData(BitcoinValues.name, BitcoinHourly.name, roundHourUTCtimestamp);
        await this.updateData(EthereumValues.name, EthereumHourly.name, roundHourUTCtimestamp);
    }

    @Cron('00 59 * * * *')
    async updateDailyAverages() {
        const UTCtimestamp = new Date().getTime() / 1000;
        const roundDayUTCtimestamp = UTCtimestamp - (UTCtimestamp % (24 * 3600));

        await this.updateData(BitcoinHourly.name, BitcoinDaily.name, roundDayUTCtimestamp);
        await this.updateData(EthereumHourly.name, EthereumDaily.name, roundDayUTCtimestamp);
    }

    @Cron('00 55 23 * * *')
    async updateMonthlyAverages() {
        const year = new Date().getUTCFullYear();
        const month = new Date().getUTCMonth() + 1;
        const monthlyTimestamp = new Date(`${year}-${month.toString().padStart(2, '0')}-01`).getTime() / 1000;

        await this.updateData(BitcoinDaily.name, BitcoinMonthly.name, monthlyTimestamp);
        await this.updateData(EthereumDaily.name, EthereumMonthly.name, monthlyTimestamp);
    }

    async updateData(modelSource: string, modelTarget: string, timestamp: number) {
        const data = await this.coinsService.find(modelSource, {
            timestamp: {
                $gte: timestamp,
            },
        });

        const avgPrice = this.coinsService.getDataAveragePrice(data, 'value');

        if (avgPrice === null) return;

        await this.coinsService.update(modelTarget, { timestamp }, { timestamp, value: avgPrice });
    }
}
