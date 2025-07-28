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
            const response = lastPrice[0].toObject();
            response.changePercent = {};
            const lastDayPrice = (
                await this.coinsService.find(this.hourlyModel, {
                    timestamp: { $gte: Date.now() / 1000 - 24 * 3600 },
                })
            ).reverse();

            response.changePercent.dayAgo = (
                100 *
                ((response.value - lastDayPrice[0].value) / lastDayPrice[0].value)
            ).toFixed(2);

            const lastWeekPrice = (
                await this.coinsService.find(this.dailyModel, {
                    timestamp: { $gte: Date.now() / 1000 - 7 * 24 * 3600 },
                })
            ).reverse();

            response.changePercent.weekAgo = (
                100 *
                ((response.value - lastWeekPrice[0].value) / lastWeekPrice[0].value)
            ).toFixed(2);

            const lastMonthPrice = (
                await this.coinsService.find(this.dailyModel, {
                    timestamp: { $gte: Date.now() / 1000 - 30 * 24 * 3600 },
                })
            ).reverse();

            response.changePercent.monthAgo = (
                100 *
                ((response.value - lastMonthPrice[0].value) / lastMonthPrice[0].value)
            ).toFixed(2);

            return [response];
        } catch (e) {
            throw new BadRequestException('An error has occurred');
        }
    }
}
