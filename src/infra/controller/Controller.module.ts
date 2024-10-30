import { Module } from '@nestjs/common';

import AuthenticationController from './AuthenticationController';
import { CategoryController } from './CategoryController';
import { ProductController } from './ProductController';
import { SubCategoryController } from './SubCategoryController';
import UserController from './UserController';
import { UseCaseModule } from '@//app/usecase/UseCase.module';

@Module({
  imports: [UseCaseModule],
  controllers: [UserController, AuthenticationController, CategoryController, SubCategoryController, ProductController]
})
export class ControllerModule {}
