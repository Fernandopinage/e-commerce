import { Injectable, Scope } from '@nestjs/common';

import { CreateProductRequest } from './CreateProductDto';
import { CreateProductValidator } from './CreateProductValidator';
import { BaseUseCaseTemplate } from '../../share/baseusecase/BaseUseCaseTemplate';
import StatusCode from '../../share/status/StatusCode';
import ProductRepository from '@/infra/repositories/ProductRepository';

@Injectable({ scope: Scope.REQUEST })
export class CreateProductUseCase extends BaseUseCaseTemplate<CreateProductRequest, void> {
  constructor(
    private productRepository: ProductRepository,
    validator: CreateProductValidator
  ) {
    super([productRepository], validator);
  }
  protected async process(): Promise<void> {
    return;
  }
  protected async processTransactions(): Promise<void> {
    await this.productRepository.upsert(this.body);
    this.setResponseStatusCode(StatusCode.ok);
    return;
  }
}
