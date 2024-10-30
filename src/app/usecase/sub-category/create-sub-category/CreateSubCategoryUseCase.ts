import { Injectable, Scope } from '@nestjs/common';

import { CreateSubCategoryDto } from './CreateSubCategoryDto';
import { CreateSubCategoryValidator } from './CreateSubCategoryValidator';
import { BaseUseCaseTemplate } from '../../share/baseusecase/BaseUseCaseTemplate';
import StatusCode from '../../share/status/StatusCode';
import SubCategoryRepository from '@/infra/repositories/SubCategoryRepository';

@Injectable({ scope: Scope.REQUEST })
export class CreateSubCategoryUseCase extends BaseUseCaseTemplate<CreateSubCategoryDto, void> {
  constructor(
    private subCategoryRepository: SubCategoryRepository,
    validator: CreateSubCategoryValidator
  ) {
    super([subCategoryRepository], validator);
  }
  protected async process(): Promise<void> {
    return;
  }
  protected async processTransactions(): Promise<void> {
    await this.subCategoryRepository.upsert(this.body);
    this.setResponseStatusCode(StatusCode.created);
    return;
  }
}
