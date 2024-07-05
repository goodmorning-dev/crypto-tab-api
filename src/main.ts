import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.setGlobalPrefix('/v1');
    const configService = app.get<ConfigService>(ConfigService);
    await app.listen(configService.get<number>('PORT'));
}

bootstrap();
