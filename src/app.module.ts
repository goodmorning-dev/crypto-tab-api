import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinsModule } from './coins/coins.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ParserService } from './parser/parser.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('DATABASE'),
                autoIndex: true,
            }),
            inject: [ConfigService],
        }),
        CoinsModule,
        SchedulerModule,
        HttpModule,
    ],
    providers: [ParserService],
})
export class AppModule {}
