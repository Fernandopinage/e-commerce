import { Injectable, Scope } from '@nestjs/common';

import { CreateCategoryRequest } from './CreateCategoryRequest';
import { CreateCategoryValidator } from './CreateCategoryValidator';
import { BaseUseCaseTemplate } from '../../share/baseusecase/BaseUseCaseTemplate';
import StatusCode from '../../share/status/StatusCode';
import UserRepository from '@//infra/repositories/UserRepository';

@Injectable({ scope: Scope.REQUEST })
export class CreateCategoryUseCase extends BaseUseCaseTemplate<CreateCategoryRequest, void> {
  constructor(
    private userRepository: UserRepository,
    validator: CreateCategoryValidator
  ) {
    super([userRepository], validator);
  }
  protected async process(): Promise<void> {
    console.log('>>>', this.body);
    this.setResponseStatusCode(StatusCode.ok);
  }
  protected async processTransactions(): Promise<void> {
    return;
  }
}
