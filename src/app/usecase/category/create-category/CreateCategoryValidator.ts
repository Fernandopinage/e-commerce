import { CreateCategoryRequest } from './CreateCategoryRequest';
import BaseValidatorAuthTemplate from '../../share/validator/BaseValidatorTemplate';

export class CreateCategoryValidator extends BaseValidatorAuthTemplate<CreateCategoryRequest, void> {
  constructor() {
    super();
  }
  protected async validate(): Promise<void> {
    return;
  }
  protected async loadEntities(): Promise<void> {
    return;
  }
}
