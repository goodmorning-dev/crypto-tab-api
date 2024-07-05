import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
    @Prop({ default: 'USD' })
    currency?: string;

    @Prop()
    value: number;

    @Prop({ default: () => Math.floor(new Date().getTime() / 1000) })
    timestamp?: number;
}
