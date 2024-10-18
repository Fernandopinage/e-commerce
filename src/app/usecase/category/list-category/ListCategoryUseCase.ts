import { Injectable, Scope } from '@nestjs/common';

import { ListCategoryRequest, ListCategoryResponse } from './ListCategoryDto';
import { ListCategoryValidator } from './ListCategoryValidator';
import { BaseGetUseCaseTempate } from '../../share/baseusecase/BaseGetUseCaseTemplate';
import CategoryRepository from '@/infra/repositories/CategoryRepository';

@Injectable({ scope: Scope.REQUEST })
export default class ListCategoryUseCase extends BaseGetUseCaseTempate<ListCategoryRequest, ListCategoryResponse> {
  constructor(
    validator: ListCategoryValidator,
    private categoryRepository: CategoryRepository
  ) {
    super(validator);
  }
  protected async process(): Promise<void> {
    const [list, total] = await this.categoryRepository.list({
      skip: Number(this.queryParams.page),
      take: Number(this.queryParams.perPage)
    });
    throw 'teste';
    this.setResponseBody({
      list,
      total
    });
  }
}
