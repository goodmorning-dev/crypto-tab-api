import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from '../base.schema';

export type WALLETValuesDocument = HydratedDocument<WALLETValues>;
export type WALLETHourlyDocument = HydratedDocument<WALLETHourly>;
export type WALLETDailyDocument = HydratedDocument<WALLETDaily>;
export type WALLETMonthlyDocument = HydratedDocument<WALLETMonthly>;

@Schema({ collection: 'wallet.values' })
export class WALLETValues extends BaseSchema {}

@Schema({ collection: 'wallet.hourly' })
export class WALLETHourly extends BaseSchema {}

@Schema({ collection: 'wallet.daily' })
export class WALLETDaily extends BaseSchema {}

@Schema({ collection: 'wallet.monthly' })
export class WALLETMonthly extends BaseSchema {}

export const WALLETValuesSchema = SchemaFactory.createForClass(WALLETValues);
export const WALLETHourlySchema = SchemaFactory.createForClass(WALLETHourly);
export const WALLETDailySchema = SchemaFactory.createForClass(WALLETDaily);
export const WALLETMonthlySchema = SchemaFactory.createForClass(WALLETMonthly);
