import { Module } from '@nestjs/common';
import { PricesCron } from './prices.cron';
import { ScheduleModule } from '@nestjs/schedule';
import { CoinsModule } from '../coins/coins.module';
import { HttpModule } from '@nestjs/axios';
import { CleanupCron } from './cleanup.cron';

@Module({
    imports: [ScheduleModule.forRoot(), HttpModule, CoinsModule],
    providers: [PricesCron, CleanupCron],
})
export class SchedulerModule {}
