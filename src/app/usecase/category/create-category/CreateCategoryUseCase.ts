import { CreateCategoryRequest } from './CreateCategoryRequest';
import { BaseUseCaseTemplate } from '../../share/baseusecase/BaseUseCaseTemplate';
import StatusCode from '../../share/status/StatusCode';

export class CreateCategoryUseCase extends BaseUseCaseTemplate<CreateCategoryRequest, void> {
  protected async process(): Promise<void> {
    console.log('>>>', this.body);
    this.setResponseStatusCode(StatusCode.ok);
  }
  protected async processTransactions(): Promise<void> {
    return;
  }
}
