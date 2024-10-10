import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
dotenv.config();

import AuthenticationUseCase from './authentication/AuthenticationUseCase';
import { CreateCategoryUseCase } from './category/create-category/CreateCategoryUseCase';
import CreateUserUseCase from './user/created-user/CreateUserUseCase';
import { RepositoryModule } from '@//infra/repositories/RepositoryModule';

@Module({
  imports: [
    RepositoryModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [CreateUserUseCase, AuthenticationUseCase, CreateCategoryUseCase],
  exports: [CreateUserUseCase, AuthenticationUseCase, CreateCategoryUseCase]
})
export class UseCaseModule {}
