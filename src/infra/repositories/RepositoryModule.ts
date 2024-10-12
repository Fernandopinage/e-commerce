import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CategoryRepository from './CategoryRepository';
import UserRepository from './UserRepository';
import { Category } from '../database/models/Category.entity';
import { User } from '../database/models/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [UserRepository, CategoryRepository],
  exports: [UserRepository, CategoryRepository]
})
export class RepositoryModule {}
