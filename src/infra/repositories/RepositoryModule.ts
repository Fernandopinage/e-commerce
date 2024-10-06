import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserRepository from './UserRepository';
import { User } from '../database/models/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class RepositoryModule {}
