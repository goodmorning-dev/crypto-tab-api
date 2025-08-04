import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type HederaValuesDocument = HydratedDocument<HederaValues>;
export type HederaHourlyDocument = HydratedDocument<HederaHourly>;
export type HederaDailyDocument = HydratedDocument<HederaDaily>;
export type HederaMonthlyDocument = HydratedDocument<HederaMonthly>;

@Schema({ collection: 'hedera.values' })
export class HederaValues extends BaseSchema {}

@Schema({ collection: 'hedera.hourly' })
export class HederaHourly extends BaseSchema {}

@Schema({ collection: 'hedera.daily' })
export class HederaDaily extends BaseSchema {}

@Schema({ collection: 'hedera.monthly' })
export class HederaMonthly extends BaseSchema {}

export const HederaValuesSchema = SchemaFactory.createForClass(HederaValues);
export const HederaHourlySchema = SchemaFactory.createForClass(HederaHourly);
export const HederaDailySchema = SchemaFactory.createForClass(HederaDaily);
export const HederaMonthlySchema = SchemaFactory.createForClass(HederaMonthly);
