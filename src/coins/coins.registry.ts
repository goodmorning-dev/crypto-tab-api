import { Query, Schema } from 'mongoose';
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
import {
    HederaDaily,
    HederaDailySchema,
    HederaHourly,
    HederaHourlySchema,
    HederaMonthly,
    HederaMonthlySchema,
    HederaValues,
    HederaValuesSchema,
} from './hedera/hedera.models';
import {
    SolanaDaily,
    SolanaDailySchema,
    SolanaHourly,
    SolanaHourlySchema,
    SolanaMonthly,
    SolanaMonthlySchema,
    SolanaValues,
    SolanaValuesSchema,
} from './solana/solana.models';
import {
    BNBDaily,
    BNBDailySchema,
    BNBHourly,
    BNBHourlySchema,
    BNBMonthly,
    BNBMonthlySchema,
    BNBValues,
    BNBValuesSchema,
} from './bnb/bnb.models';
import {
    XRPDaily,
    XRPDailySchema,
    XRPHourly,
    XRPHourlySchema,
    XRPMonthly,
    XRPMonthlySchema,
    XRPValues,
    XRPValuesSchema,
} from './xrp/xrp.models';
import {
    DOGEDaily,
    DOGEDailySchema,
    DOGEHourly,
    DOGEHourlySchema,
    DOGEMonthly,
    DOGEMonthlySchema,
    DOGEValues,
    DOGEValuesSchema,
} from './doge/doge.models';

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

export const Hedera: Coin = {
    name: 'hedera',
    coingecko_id: 'hedera-hashgraph',
    csv_data_source: 'coingecko.com',
    csv_data: 'hedera.csv',
    precision: 6,
    Values: HederaValues.name,
    Hourly: HederaHourly.name,
    Daily: HederaDaily.name,
    Monthly: HederaMonthly.name,
    ValuesSchema: HederaValuesSchema,
    HourlySchema: HederaHourlySchema,
    DailySchema: HederaDailySchema,
    MonthlySchema: HederaMonthlySchema,
};

export const Solana: Coin = {
    name: 'solana',
    coingecko_id: 'solana',
    csv_data_source: 'coingecko.com',
    csv_data: 'solana.csv',
    precision: 2,
    Values: SolanaValues.name,
    Hourly: SolanaHourly.name,
    Daily: SolanaDaily.name,
    Monthly: SolanaMonthly.name,
    ValuesSchema: SolanaValuesSchema,
    HourlySchema: SolanaHourlySchema,
    DailySchema: SolanaDailySchema,
    MonthlySchema: SolanaMonthlySchema,
};

export const BNB: Coin = {
    name: 'bnb',
    coingecko_id: 'binancecoin',
    csv_data_source: 'coingecko.com',
    csv_data: 'bnb.csv',
    precision: 2,
    Values: BNBValues.name,
    Hourly: BNBHourly.name,
    Daily: BNBDaily.name,
    Monthly: BNBMonthly.name,
    ValuesSchema: BNBValuesSchema,
    HourlySchema: BNBHourlySchema,
    DailySchema: BNBDailySchema,
    MonthlySchema: BNBMonthlySchema,
};

export const XRP: Coin = {
    name: 'xrp',
    coingecko_id: 'ripple',
    csv_data_source: 'coingecko.com',
    csv_data: 'xrp.csv',
    precision: 4,
    Values: XRPValues.name,
    Hourly: XRPHourly.name,
    Daily: XRPDaily.name,
    Monthly: XRPMonthly.name,
    ValuesSchema: XRPValuesSchema,
    HourlySchema: XRPHourlySchema,
    DailySchema: XRPDailySchema,
    MonthlySchema: XRPMonthlySchema,
};

export const DOGE: Coin = {
    name: 'doge',
    coingecko_id: 'dogecoin',
    csv_data_source: 'coingecko.com',
    csv_data: 'doge.csv',
    precision: 6,
    Values: DOGEValues.name,
    Hourly: DOGEHourly.name,
    Daily: DOGEDaily.name,
    Monthly: DOGEMonthly.name,
    ValuesSchema: DOGEValuesSchema,
    HourlySchema: DOGEHourlySchema,
    DailySchema: DOGEDailySchema,
    MonthlySchema: DOGEMonthlySchema,
};

export const SupportedCoins = [Bitcoin, Ethereum, WALLET, Hedera, Solana, BNB, XRP, DOGE];

function addPreFindHook(schema: Schema) {
    schema.pre(/^find/, function (this: Query<unknown, unknown>) {
        this.sort('-timestamp');
        this.select('-_id -__v');
    });
}

for (const coin of SupportedCoins) {
    [coin.ValuesSchema, coin.HourlySchema, coin.DailySchema, coin.MonthlySchema].forEach(addPreFindHook);
}
