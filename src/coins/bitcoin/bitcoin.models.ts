import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type BitcoinValuesDocument = HydratedDocument<BitcoinValues>;
export type BitcoinHourlyDocument = HydratedDocument<BitcoinHourly>;
export type BitcoinDailyDocument = HydratedDocument<BitcoinDaily>;
export type BitcoinMonthlyDocument = HydratedDocument<BitcoinMonthly>;

@Schema({ collection: 'bitcoin.values' })
export class BitcoinValues extends BaseSchema {}

@Schema({ collection: 'bitcoin.hourly' })
export class BitcoinHourly extends BaseSchema {}

@Schema({ collection: 'bitcoin.daily' })
export class BitcoinDaily extends BaseSchema {}

@Schema({ collection: 'bitcoin.monthly' })
export class BitcoinMonthly extends BaseSchema {}

export const BitcoinValuesSchema = SchemaFactory.createForClass(BitcoinValues);
export const BitcoinHourlySchema = SchemaFactory.createForClass(BitcoinHourly);
export const BitcoinDailySchema = SchemaFactory.createForClass(BitcoinDaily);
export const BitcoinMonthlySchema = SchemaFactory.createForClass(BitcoinMonthly);
