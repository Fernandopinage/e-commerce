import { CreateProductRequest } from './CreateProductDto';
import BaseValidatorAuthTemplate from '../../share/validator/BaseValidatorTemplate';

export class CreateProductValidator extends BaseValidatorAuthTemplate<CreateProductRequest, void> {
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
