import { DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Projeto ecommerce')
  .setDescription('Plataforma de ecommece')
  .setVersion(process.env.SWAGGER_VERSION ?? '')
  .addBearerAuth()
  .build();
