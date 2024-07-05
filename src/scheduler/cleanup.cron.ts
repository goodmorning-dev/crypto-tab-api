import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinsService } from '../coins/coins.service';
import { BitcoinDaily, BitcoinHourly, BitcoinValues } from '../coins/bitcoin/bitcoin.models';
import { EthereumDaily, EthereumHourly, EthereumValues } from '../coins/ethereum/ethereum.models';

@Injectable()
export class CleanupCron {
    constructor(private coinsService: CoinsService) {}

    @Cron(CronExpression.EVERY_10_MINUTES)
    async cleanValues() {
        // remove values which are more than 24 hours old

        await this.coinsService.delete(BitcoinValues.name, {
            timestamp: {
                $lte: new Date().getTime() / 1000 - 24 * 3600,
            },
        });

        await this.coinsService.delete(EthereumValues.name, {
            timestamp: {
                $lte: new Date().getTime() / 1000 - 24 * 3600,
            },
        });
    }

    @Cron('00 15 00 * * *')
    async cleanHourly() {
        // remove hourly avereage values which are more than 3 days old

        await this.coinsService.delete(BitcoinHourly.name, {
            timestamp: {
                $lte: new Date().getTime() / 1000 - 3 * 24 * 3600,
            },
        });

        await this.coinsService.delete(EthereumHourly.name, {
            timestamp: {
                $lte: new Date().getTime() / 1000 - 3 * 24 * 3600,
            },
        });
    }

    @Cron('00 20 00 * * *')
    async cleanDaily() {
        // remove daily average values which are more than 90 days old

        await this.coinsService.delete(BitcoinDaily.name, {
            timestamp: {
                $lte: new Date().getTime() / 1000 - 90 * 24 * 3600,
            },
        });

        await this.coinsService.delete(EthereumDaily.name, {
            timestamp: {
                $lte: new Date().getTime() / 1000 - 90 * 24 * 3600,
            },
        });
    }
}
