import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { BaseRepository } from './shared/BaseRepository';
import { SubCategory } from '../database/models/SubCategory.entity';

@Injectable({
  scope: Scope.REQUEST
})
export default class SubCategoryRepository extends BaseRepository {
  constructor(
    @InjectRepository(SubCategory)
    private readonly categoryRepository: Repository<SubCategory>
  ) {
    super();
  }

  async upsertBulk(data: DeepPartial<SubCategory>[]): Promise<SubCategory[]> {
    return await this.categoryRepository.save(data);
  }

  async upsert(data: Partial<SubCategory> | DeepPartial<SubCategory>): Promise<SubCategory> {
    return await this.categoryRepository.save(data);
  }

  async getBy(data: FindOneOptions<SubCategory>): Promise<SubCategory | null> {
    return await this.categoryRepository.findOne(data);
  }

  async list(optional?: FindManyOptions<SubCategory>): Promise<[SubCategory[], number]> {
    return await this.categoryRepository.findAndCount(optional);
  }
}
