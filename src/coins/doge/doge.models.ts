import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type DOGEValuesDocument = HydratedDocument<DOGEValues>;
export type DOGEHourlyDocument = HydratedDocument<DOGEHourly>;
export type DOGEDailyDocument = HydratedDocument<DOGEDaily>;
export type DOGEMonthlyDocument = HydratedDocument<DOGEMonthly>;

const collection_prefix = 'doge';

@Schema({ collection: `${collection_prefix}.values` })
export class DOGEValues extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.hourly` })
export class DOGEHourly extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.daily` })
export class DOGEDaily extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.monthly` })
export class DOGEMonthly extends BaseSchema {}

export const DOGEValuesSchema = SchemaFactory.createForClass(DOGEValues);
export const DOGEHourlySchema = SchemaFactory.createForClass(DOGEHourly);
export const DOGEDailySchema = SchemaFactory.createForClass(DOGEDaily);
export const DOGEMonthlySchema = SchemaFactory.createForClass(DOGEMonthly);
