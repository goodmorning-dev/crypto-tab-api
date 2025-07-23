import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from './base.schema';
import { BitcoinDaily, BitcoinHourly, BitcoinMonthly, BitcoinValues } from './bitcoin/bitcoin.models';
import { EthereumDaily, EthereumHourly, EthereumMonthly, EthereumValues } from './ethereum/ethereum.models';

@Injectable()
export class CoinsService {
    constructor(
        @InjectModel(BitcoinValues.name) private bitcoinValuesModel: Model<BitcoinValues>,
        @InjectModel(BitcoinHourly.name) private bitcoinHourlyModel: Model<BitcoinHourly>,
        @InjectModel(BitcoinDaily.name) private bitcoinDailyModel: Model<BitcoinDaily>,
        @InjectModel(BitcoinMonthly.name) private bitcoinMonthlyModel: Model<BitcoinMonthly>,
        @InjectModel(EthereumValues.name) private ethereumValuesModel: Model<EthereumValues>,
        @InjectModel(EthereumHourly.name) private ethereumHourlyModel: Model<EthereumHourly>,
        @InjectModel(EthereumDaily.name) private ethereumDailyModel: Model<EthereumDaily>,
        @InjectModel(EthereumMonthly.name) private ethereumMonthlyModel: Model<EthereumMonthly>,
    ) {}

    async create(modelName: string, data: BaseSchema) {
        const model = this.getModel(modelName);
        const record = new model(data);
        return await record.save();
    }

    async find(modelName: string, filter: object) {
        const model = this.getModel(modelName);
        return await model.find(filter);
    }

    async update(modelName: string, filter: object, data: object) {
        const model = this.getModel(modelName);
        await model.updateOne(filter, data, { upsert: true });
    }

    async insert(modelName: string, data: object) {
        const model = this.getModel(modelName);
        await this.delete(modelName, {});
        await model.insertMany(data);
    }

    async delete(modelName: string, filter: object) {
        const model = this.getModel(modelName);
        await model.deleteMany(filter);
    }

    async countDocuments(modelName: string, filter: object) {
        const model = this.getModel(modelName);
        return await model.countDocuments(filter);
    }

    getModel(name: string): Model<any> {
        switch (name) {
            case BitcoinValues.name:
                return this.bitcoinValuesModel;
            case BitcoinHourly.name:
                return this.bitcoinHourlyModel;
            case BitcoinDaily.name:
                return this.bitcoinDailyModel;
            case BitcoinMonthly.name:
                return this.bitcoinMonthlyModel;
            case EthereumValues.name:
                return this.ethereumValuesModel;
            case EthereumHourly.name:
                return this.ethereumHourlyModel;
            case EthereumDaily.name:
                return this.ethereumDailyModel;
            case EthereumMonthly.name:
                return this.ethereumMonthlyModel;
            default:
                throw new Error('Invalid model name');
        }
    }

    getDataAveragePrice(data: any, attributeName: string) {
        const count = data.length;
        let avg = 0.0;
        let sum = 0.0;

        if (count === 0) return null;

        for (let i = 0; i < count; i++) {
            sum += parseFloat(data[i][attributeName]);
        }

        avg = parseFloat((sum / count).toFixed(2));

        return avg;
    }
}
