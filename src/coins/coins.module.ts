import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    BitcoinDaily,
    BitcoinDailySchema,
    BitcoinHourly,
    BitcoinHourlySchema,
    BitcoinMonthly,
    BitcoinMonthlySchema,
    BitcoinValues,
    BitcoinValuesSchema,
} from './bitcoin/bitcoin.models';
import {
    EthereumDaily,
    EthereumDailySchema,
    EthereumHourly,
    EthereumHourlySchema,
    EthereumMonthly,
    EthereumMonthlySchema,
    EthereumValues,
    EthereumValuesSchema,
} from './ethereum/ethereum.models';
import { BitcoinController } from './bitcoin/bitcoin.controller';
import { EthereumController } from './ethereum/ethereum.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: BitcoinValues.name, schema: BitcoinValuesSchema }]),
        MongooseModule.forFeature([{ name: BitcoinHourly.name, schema: BitcoinHourlySchema }]),
        MongooseModule.forFeature([{ name: BitcoinDaily.name, schema: BitcoinDailySchema }]),
        MongooseModule.forFeature([{ name: BitcoinMonthly.name, schema: BitcoinMonthlySchema }]),
        MongooseModule.forFeature([{ name: EthereumValues.name, schema: EthereumValuesSchema }]),
        MongooseModule.forFeature([{ name: EthereumHourly.name, schema: EthereumHourlySchema }]),
        MongooseModule.forFeature([{ name: EthereumDaily.name, schema: EthereumDailySchema }]),
        MongooseModule.forFeature([{ name: EthereumMonthly.name, schema: EthereumMonthlySchema }]),
    ],
    controllers: [BitcoinController, EthereumController],
    providers: [CoinsService],
    exports: [CoinsService],
})
export class CoinsModule {}
