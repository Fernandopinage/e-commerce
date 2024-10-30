import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { BaseRepository } from './shared/BaseRepository';
import { Product } from '../database/models/Product.entity';
import { SubCategory } from '../database/models/SubCategory.entity';

@Injectable({
  scope: Scope.REQUEST
})
export default class ProductRepository extends BaseRepository {
  constructor(
    @InjectRepository(Product)
    private readonly categoryRepository: Repository<Product>
  ) {
    super();
  }

  async upsertBulk(data: DeepPartial<Product>[]): Promise<Product[]> {
    return await this.categoryRepository.save(data);
  }

  async upsert(data: Partial<SubCategory> | DeepPartial<Product>): Promise<Product> {
    return await this.categoryRepository.save(data);
  }

  async getBy(data: FindOneOptions<Product>): Promise<Product | null> {
    return await this.categoryRepository.findOne(data);
  }

  async list(optional?: FindManyOptions<Product>): Promise<[Product[], number]> {
    return await this.categoryRepository.findAndCount(optional);
  }
}
