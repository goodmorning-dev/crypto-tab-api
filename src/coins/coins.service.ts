import { Injectable } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from './base.schema';
import { ModuleRef } from '@nestjs/core';
import { SupportedCoins } from './coins.registry';

@Injectable()
export class CoinsService {
    private models: Record<string, Model<any>> = {};

    constructor(private moduleRef: ModuleRef) {}

    async onModuleInit() {
        for (const coin of SupportedCoins) {
            const modelNames = [coin.Values, coin.Hourly, coin.Daily, coin.Monthly];
            for (const name of modelNames) {
                this.models[name] = this.moduleRef.get(getModelToken(name), {
                    strict: false,
                });
            }
        }
    }

    async create(modelName: string, data: BaseSchema) {
        const model = this.models[modelName];
        const record = new model(data);
        return await record.save();
    }

    async find(modelName: string, filter: object) {
        return this.models[modelName].find(filter);
    }

    async update(modelName: string, filter: object, data: object) {
        await this.models[modelName].updateOne(filter, data, { upsert: true });
    }

    async insert(modelName: string, data: object) {
        await this.delete(modelName, {});
        await this.models[modelName].insertMany(data);
    }

    async delete(modelName: string, filter: object) {
        await this.models[modelName].deleteMany(filter);
    }

    async countDocuments(modelName: string, filter: object) {
        return this.models[modelName].countDocuments(filter);
    }

    getDataAveragePrice(data: any[], precision: number) {
        if (!data.length) return null;
        const sum = data.reduce((acc, item) => acc + parseFloat(item['value']), 0);
        return parseFloat((sum / data.length).toFixed(precision));
    }
}
