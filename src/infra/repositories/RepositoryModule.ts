import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CategoryRepository from './CategoryRepository';
import ProductRepository from './ProductRepository';
import SubCategoryRepository from './SubCategoryRepository';
import UserRepository from './UserRepository';
import { Category } from '../database/models/Category.entity';
import { Product } from '../database/models/Product.entity';
import { SubCategory } from '../database/models/SubCategory.entity';
import { User } from '../database/models/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, SubCategory, Product])],
  providers: [UserRepository, CategoryRepository, SubCategoryRepository, ProductRepository],
  exports: [UserRepository, CategoryRepository, SubCategoryRepository, ProductRepository]
})
export class RepositoryModule {}
