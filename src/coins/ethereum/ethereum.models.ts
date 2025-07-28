import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type EthereumValuesDocument = HydratedDocument<EthereumValues>;
export type EthereumHourlyDocument = HydratedDocument<EthereumHourly>;
export type EthereumDailyDocument = HydratedDocument<EthereumDaily>;
export type EthereumMonthlyDocument = HydratedDocument<EthereumMonthly>;

@Schema({ collection: 'ethereum.values' })
export class EthereumValues extends BaseSchema {}

@Schema({ collection: 'ethereum.hourly' })
export class EthereumHourly extends BaseSchema {}

@Schema({ collection: 'ethereum.daily' })
export class EthereumDaily extends BaseSchema {}

@Schema({ collection: 'ethereum.monthly' })
export class EthereumMonthly extends BaseSchema {}

export const EthereumValuesSchema = SchemaFactory.createForClass(EthereumValues);
export const EthereumHourlySchema = SchemaFactory.createForClass(EthereumHourly);
export const EthereumDailySchema = SchemaFactory.createForClass(EthereumDaily);
export const EthereumMonthlySchema = SchemaFactory.createForClass(EthereumMonthly);
