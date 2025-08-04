import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type WALLETValuesDocument = HydratedDocument<WALLETValues>;
export type WALLETHourlyDocument = HydratedDocument<WALLETHourly>;
export type WALLETDailyDocument = HydratedDocument<WALLETDaily>;
export type WALLETMonthlyDocument = HydratedDocument<WALLETMonthly>;

const collection_prefix = 'wallet';

@Schema({ collection: `${collection_prefix}.values` })
export class WALLETValues extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.hourly` })
export class WALLETHourly extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.daily` })
export class WALLETDaily extends BaseSchema {}

@Schema({ collection: `${collection_prefix}.monthly` })
export class WALLETMonthly extends BaseSchema {}

export const WALLETValuesSchema = SchemaFactory.createForClass(WALLETValues);
export const WALLETHourlySchema = SchemaFactory.createForClass(WALLETHourly);
export const WALLETDailySchema = SchemaFactory.createForClass(WALLETDaily);
export const WALLETMonthlySchema = SchemaFactory.createForClass(WALLETMonthly);
