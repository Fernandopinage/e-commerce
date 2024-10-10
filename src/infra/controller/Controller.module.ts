import { Module } from '@nestjs/common';

import AuthenticationController from './AuthenticationController';
import { CategoryController } from './CategoryController';
import UserController from './UserController';
import { UseCaseModule } from '@//app/usecase/UseCase.module';

@Module({
  imports: [UseCaseModule],
  controllers: [UserController, AuthenticationController, CategoryController]
})
export class ControllerModule {}
