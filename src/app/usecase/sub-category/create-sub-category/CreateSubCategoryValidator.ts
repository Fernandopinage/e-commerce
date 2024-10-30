import { CreateSubCategoryDto } from './CreateSubCategoryDto';
import BaseValidatorAuthTemplate from '../../share/validator/BaseValidatorTemplate';

export class CreateSubCategoryValidator extends BaseValidatorAuthTemplate<CreateSubCategoryDto, void> {
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
