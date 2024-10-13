import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
dotenv.config();

import AuthenticationUseCase from './authentication/AuthenticationUseCase';
import { AuthenticationValidator } from './authentication/AuthenticationValidator';
import { CreateCategoryUseCase } from './category/create-category/CreateCategoryUseCase';
import { CreateCategoryValidator } from './category/create-category/CreateCategoryValidator';
import ListCategoryUseCase from './category/list-category/ListCategoryUseCase';
import { ListCategoryValidator } from './category/list-category/ListCategoryValidator';
import CreateUserUseCase from './user/created-user/CreateUserUseCase';
import { RepositoryModule } from '@//infra/repositories/RepositoryModule';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    }),
    PassportModule
  ],
  providers: [
    CreateUserUseCase,
    AuthenticationUseCase,
    AuthenticationValidator,
    CreateCategoryUseCase,
    CreateCategoryValidator,
    ListCategoryValidator,
    ListCategoryUseCase
  ],
  exports: [
    CreateUserUseCase,
    AuthenticationUseCase,
    AuthenticationValidator,
    CreateCategoryUseCase,
    CreateCategoryValidator,
    ListCategoryValidator,
    ListCategoryUseCase
  ]
})
export class UseCaseModule {}
