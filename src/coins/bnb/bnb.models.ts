import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type BNBValuesDocument = HydratedDocument<BNBValues>;
export type BNBHourlyDocument = HydratedDocument<BNBHourly>;
export type BNBDailyDocument = HydratedDocument<BNBDaily>;
export type BNBMonthlyDocument = HydratedDocument<BNBMonthly>;

const collection_prefix = 'bnb';

@Schema({ collection: `${collection_prefix}.values` })
export class BNBValues extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.hourly` })
export class BNBHourly extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.daily` })
export class BNBDaily extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.monthly` })
export class BNBMonthly extends BaseSchema {}

export const BNBValuesSchema = SchemaFactory.createForClass(BNBValues);
export const BNBHourlySchema = SchemaFactory.createForClass(BNBHourly);
export const BNBDailySchema = SchemaFactory.createForClass(BNBDaily);
export const BNBMonthlySchema = SchemaFactory.createForClass(BNBMonthly);
