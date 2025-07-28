import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
    @Prop({ default: 'USD' })
    currency?: string;

    @Prop()
    value: number;

    @Prop({ default: () => Math.floor(Date.now() / 1000) })
    timestamp?: number;
}
