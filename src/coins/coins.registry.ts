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
import {
    WALLETDaily,
    WALLETDailySchema,
    WALLETHourly,
    WALLETHourlySchema,
    WALLETMonthly,
    WALLETMonthlySchema,
    WALLETValues,
    WALLETValuesSchema,
} from './wallet/wallet.models';

export interface Coin {
    name: string;
    coingecko_id: string;
    csv_data_source: string;
    csv_data: string;
    precision: number;
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
    coingecko_id: 'bitcoin',
    csv_data_source: 'investing.com',
    csv_data: 'bitcoin.csv',
    precision: 2,
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
    coingecko_id: 'ethereum',
    csv_data_source: 'investing.com',
    csv_data: 'ethereum.csv',
    precision: 2,
    Values: EthereumValues.name,
    Hourly: EthereumHourly.name,
    Daily: EthereumDaily.name,
    Monthly: EthereumMonthly.name,
    ValuesSchema: EthereumValuesSchema,
    HourlySchema: EthereumHourlySchema,
    DailySchema: EthereumDailySchema,
    MonthlySchema: EthereumMonthlySchema,
};

export const WALLET: Coin = {
    name: 'wallet',
    coingecko_id: 'ambire-wallet',
    csv_data_source: 'coingecko.com',
    csv_data: 'wallet.csv',
    precision: 8,
    Values: WALLETValues.name,
    Hourly: WALLETHourly.name,
    Daily: WALLETDaily.name,
    Monthly: WALLETMonthly.name,
    ValuesSchema: WALLETValuesSchema,
    HourlySchema: WALLETHourlySchema,
    DailySchema: WALLETDailySchema,
    MonthlySchema: WALLETMonthlySchema,
};

export const SupportedCoins = [Bitcoin, Ethereum, WALLET];

function addPreFindHook(schema) {
    schema.pre(/^find/, function () {
        this.sort('-timestamp');
        this.select('-_id -__v');
    });
}

for (const coin of SupportedCoins) {
    [coin.ValuesSchema, coin.HourlySchema, coin.DailySchema, coin.MonthlySchema].forEach(addPreFindHook);
}
