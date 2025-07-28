import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinsService } from '../coins/coins.service';
import { SupportedCoins } from '../coins/coins.registry';

@Injectable()
export class CleanupCron {
    constructor(private coinsService: CoinsService) {}

    @Cron(CronExpression.EVERY_10_MINUTES)
    async cleanValues() {
        // remove values which are more than 24 hours old
        const cutoff = Date.now() / 1000 - 24 * 3600;

        await Promise.allSettled(
            SupportedCoins.map((coin) => this.coinsService.delete(coin.Values, { timestamp: { $lte: cutoff } })),
        );
    }

    @Cron('00 15 00 * * *')
    async cleanHourly() {
        // remove hourly average values which are more than 3 days old
        const cutoff = Date.now() / 1000 - 3 * 24 * 3600;

        await Promise.allSettled(
            SupportedCoins.map((coin) => this.coinsService.delete(coin.Hourly, { timestamp: { $lte: cutoff } })),
        );
    }

    @Cron('00 20 00 * * *')
    async cleanDaily() {
        // remove daily average values which are more than 90 days old
        const cutoff = Date.now() / 1000 - 90 * 24 * 3600;

        await Promise.allSettled(
            SupportedCoins.map((coin) => this.coinsService.delete(coin.Daily, { timestamp: { $lte: cutoff } })),
        );
    }
}
