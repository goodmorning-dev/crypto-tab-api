import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type XRPValuesDocument = HydratedDocument<XRPValues>;
export type XRPHourlyDocument = HydratedDocument<XRPHourly>;
export type XRPDailyDocument = HydratedDocument<XRPDaily>;
export type XRPMonthlyDocument = HydratedDocument<XRPMonthly>;

const collection_prefix = 'xrp';

@Schema({ collection: `${collection_prefix}.values` })
export class XRPValues extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.hourly` })
export class XRPHourly extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.daily` })
export class XRPDaily extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.monthly` })
export class XRPMonthly extends BaseSchema {}

export const XRPValuesSchema = SchemaFactory.createForClass(XRPValues);
export const XRPHourlySchema = SchemaFactory.createForClass(XRPHourly);
export const XRPDailySchema = SchemaFactory.createForClass(XRPDaily);
export const XRPMonthlySchema = SchemaFactory.createForClass(XRPMonthly);
