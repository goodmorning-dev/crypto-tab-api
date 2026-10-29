import { Get, BadRequestException } from '@nestjs/common';
import { CoinsService } from './coins.service';

export class BaseController {
    constructor(
        protected readonly coinsService: CoinsService,
        private readonly monthlyModel: string,
        private readonly dailyModel: string,
        private readonly hourlyModel: string,
        private readonly valuesModel: string,
    ) {}

    @Get('/all')
    async getAll() {
        try {
            return await this.coinsService.find(this.monthlyModel, {});
        } catch (e) {
            throw new BadRequestException('An error has occurred');
        }
    }

    @Get('/year')
    async getYear() {
        try {
            const oneYearInSeconds = 12 * 30 * 24 * 3600;
            const timestamp = Math.floor(Date.now() / 1000) - oneYearInSeconds;
            return await this.coinsService.find(this.monthlyModel, { timestamp: { $gte: timestamp } });
        } catch (e) {
            throw new BadRequestException('An error has occurred');
        }
    }

    @Get('/month')
    async getMonth() {
        try {
            return await this.coinsService.find(this.dailyModel, {
                timestamp: { $gte: Date.now() / 1000 - 30 * 24 * 3600 },
            });
        } catch (e) {
            throw new BadRequestException('An error has occurred');
        }
    }

    @Get('/week')
    async getWeek() {
        try {
            return await this.coinsService.find(this.dailyModel, {
                timestamp: { $gte: Date.now() / 1000 - 7 * 24 * 3600 },
            });
        } catch (e) {
            throw new BadRequestException('An error has occurred');
        }
    }

    @Get('/day')
    async getDay() {
        try {
            return await this.coinsService.find(this.hourlyModel, {
                timestamp: { $gte: Date.now() / 1000 - 24 * 3600 },
            });
        } catch (e) {
            throw new BadRequestException('An error has occurred');
        }
    }

    @Get('/hour')
    async getHour() {
        try {
            return await this.coinsService.find(this.valuesModel, {
                timestamp: { $gte: Date.now() / 1000 - 3600 },
            });
        } catch (e) {
            throw new BadRequestException('An error has occurred');
        }
    }

    @Get('/now')
    async getNow() {
        try {
            const lastPrice = await this.coinsService.find(this.valuesModel, {
                timestamp: { $gte: Date.now() / 1000 - 20 * 60 },
            });
            if (lastPrice.length === 0) return [];

            const response = lastPrice[0].toObject();
            response.changePercent = {
                dayAgo: await this.getChangePercent(response.value, this.hourlyModel, 24 * 3600),
                weekAgo: await this.getChangePercent(response.value, this.dailyModel, 7 * 24 * 3600),
                monthAgo: await this.getChangePercent(response.value, this.dailyModel, 30 * 24 * 3600),
            };

            return [response];
        } catch (e) {
            console.log(e);
            throw new BadRequestException('An error has occurred');
        }
    }

    // Returns null when there is no reference price in the period (e.g. after downtime)
    private async getChangePercent(currentValue: number, modelName: string, periodInSeconds: number) {
        const prices = await this.coinsService.find(modelName, {
            timestamp: { $gte: Date.now() / 1000 - periodInSeconds },
        });
        // find() sorts newest first, so the last one is the oldest price in the period
        const oldestPrice = prices[prices.length - 1];
        if (!oldestPrice || !oldestPrice.value) return null;

        return (100 * ((currentValue - oldestPrice.value) / oldestPrice.value)).toFixed(2);
    }
}
