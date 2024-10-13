import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { BaseRepository } from './shared/BaseRepository';
import { Category } from '../database/models/Category.entity';

@Injectable({
  scope: Scope.REQUEST
})
export default class CategoryRepository extends BaseRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {
    super();
  }

  async upsertBulk(data: DeepPartial<Category>[]): Promise<Category[]> {
    return await this.categoryRepository.save(data);
  }

  async upsert(data: Partial<Category> | DeepPartial<Category>): Promise<Category> {
    return await this.categoryRepository.save(data);
  }

  async getBy(data: FindOneOptions<Category>): Promise<Category | null> {
    return await this.categoryRepository.findOne(data);
  }

  async list(optional?: FindManyOptions<Category>): Promise<[Category[], number]> {
    return await this.categoryRepository.findAndCount(optional);
  }
}
