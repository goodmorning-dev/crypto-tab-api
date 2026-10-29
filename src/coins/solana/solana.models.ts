import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type SolanaValuesDocument = HydratedDocument<SolanaValues>;
export type SolanaHourlyDocument = HydratedDocument<SolanaHourly>;
export type SolanaDailyDocument = HydratedDocument<SolanaDaily>;
export type SolanaMonthlyDocument = HydratedDocument<SolanaMonthly>;

const collection_prefix = 'solana';

@Schema({ collection: `${collection_prefix}.values` })
export class SolanaValues extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.hourly` })
export class SolanaHourly extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.daily` })
export class SolanaDaily extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.monthly` })
export class SolanaMonthly extends BaseSchema {}

export const SolanaValuesSchema = SchemaFactory.createForClass(SolanaValues);
export const SolanaHourlySchema = SchemaFactory.createForClass(SolanaHourly);
export const SolanaDailySchema = SchemaFactory.createForClass(SolanaDaily);
export const SolanaMonthlySchema = SchemaFactory.createForClass(SolanaMonthly);
