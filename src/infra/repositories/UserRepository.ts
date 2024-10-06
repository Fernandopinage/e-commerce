import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { User } from '../database/models/User.entity';

@Injectable({
  scope: Scope.REQUEST
})
export default class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly companyRepository: Repository<User>
  ) {}

  @Transactional()
  async upsert(data: Partial<User> | DeepPartial<User>): Promise<User> {
    return await this.companyRepository.save(data);
  }

  async getBy(data: FindOneOptions<User>): Promise<User | null> {
    return await this.companyRepository.findOne(data);
  }

  async findAll(optional?: FindManyOptions<User>): Promise<[User[], number]> {
    return await this.companyRepository.findAndCount(optional);
  }
}
