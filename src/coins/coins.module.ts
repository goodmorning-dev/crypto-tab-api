import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BitcoinController } from './bitcoin/bitcoin.controller';
import { EthereumController } from './ethereum/ethereum.controller';
import { SupportedCoins } from './coins.registry';
import { WALLETController } from './wallet/wallet.controller';
import { HederaController } from './hedera/hedera.controller';

const coinModels = SupportedCoins.flatMap((coin) => [
    { name: coin.Values, schema: coin.ValuesSchema },
    { name: coin.Hourly, schema: coin.HourlySchema },
    { name: coin.Daily, schema: coin.DailySchema },
    { name: coin.Monthly, schema: coin.MonthlySchema },
]);

@Module({
    imports: [MongooseModule.forFeature(coinModels)],
    controllers: [BitcoinController, EthereumController, WALLETController, HederaController],
    providers: [CoinsService],
    exports: [CoinsService],
})
export class CoinsModule {}
