import { Schema } from 'mongoose';
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

export interface Coin {
    name: string;
    csv_data: string;
    Values: string;
    Hourly: string;
    Daily: string;
    Monthly: string;
    ValuesSchema: Schema;
    HourlySchema: Schema;
    DailySchema: Schema;
    MonthlySchema: Schema;
}

export const Bitcoin: Coin = {
    name: 'bitcoin',
    csv_data: 'bitcoin.csv',
    Values: BitcoinValues.name,
    Hourly: BitcoinHourly.name,
    Daily: BitcoinDaily.name,
    Monthly: BitcoinMonthly.name,
    ValuesSchema: BitcoinValuesSchema,
    HourlySchema: BitcoinHourlySchema,
    DailySchema: BitcoinDailySchema,
    MonthlySchema: BitcoinMonthlySchema,
};

export const Ethereum: Coin = {
    name: 'ethereum',
    csv_data: 'ethereum.csv',
    Values: EthereumValues.name,
    Hourly: EthereumHourly.name,
    Daily: EthereumDaily.name,
    Monthly: EthereumMonthly.name,
    ValuesSchema: EthereumValuesSchema,
    HourlySchema: EthereumHourlySchema,
    DailySchema: EthereumDailySchema,
    MonthlySchema: EthereumMonthlySchema,
};

export const SupportedCoins = [Bitcoin, Ethereum];

function addPreFindHook(schema) {
    schema.pre(/^find/, function () {
        this.sort('-timestamp');
        this.select('-_id -__v');
    });
}

for (const coin of SupportedCoins) {
    [coin.ValuesSchema, coin.HourlySchema, coin.DailySchema, coin.MonthlySchema].forEach(addPreFindHook);
}
