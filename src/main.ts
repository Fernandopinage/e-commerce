import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { LoggerAdapter } from './infra/adapter/LoggerAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerAdapter()
  });
  await app.listen(3000);
}
bootstrap();
