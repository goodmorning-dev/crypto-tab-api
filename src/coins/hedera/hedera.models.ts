import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type HederaValuesDocument = HydratedDocument<HederaValues>;
export type HederaHourlyDocument = HydratedDocument<HederaHourly>;
export type HederaDailyDocument = HydratedDocument<HederaDaily>;
export type HederaMonthlyDocument = HydratedDocument<HederaMonthly>;

const collection_prefix = 'hedera';

@Schema({ collection: `${collection_prefix}.values` })
export class HederaValues extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.hourly` })
export class HederaHourly extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.daily` })
export class HederaDaily extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.monthly` })
export class HederaMonthly extends BaseSchema {}

export const HederaValuesSchema = SchemaFactory.createForClass(HederaValues);
export const HederaHourlySchema = SchemaFactory.createForClass(HederaHourly);
export const HederaDailySchema = SchemaFactory.createForClass(HederaDaily);
export const HederaMonthlySchema = SchemaFactory.createForClass(HederaMonthly);
