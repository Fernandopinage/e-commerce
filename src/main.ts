import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { LoggerAdapter } from './infra/adapter/LoggerAdapter';
import { swaggerConfig } from './infra/database/config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerAdapter()
  });
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(3000);
}
bootstrap();
