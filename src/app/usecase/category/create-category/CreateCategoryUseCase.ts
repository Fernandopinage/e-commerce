import { Injectable, Scope } from '@nestjs/common';

import { CreateCategoryRequest } from './CreateCategoryRequest';
import { CreateCategoryValidator } from './CreateCategoryValidator';
import { BaseUseCaseTemplate } from '../../share/baseusecase/BaseUseCaseTemplate';
import StatusCode from '../../share/status/StatusCode';
import CategoryRepository from '@//infra/repositories/CategoryRepository';

@Injectable({ scope: Scope.REQUEST })
export class CreateCategoryUseCase extends BaseUseCaseTemplate<CreateCategoryRequest, void> {
  constructor(
    private categoryRepository: CategoryRepository,
    validator: CreateCategoryValidator
  ) {
    super([categoryRepository], validator);
  }
  protected async process(): Promise<void> {
    await this.categoryRepository.upsert(this.body);
    this.setResponseStatusCode(StatusCode.ok);
    return;
  }
  protected async processTransactions(): Promise<void> {
    return;
  }
}
