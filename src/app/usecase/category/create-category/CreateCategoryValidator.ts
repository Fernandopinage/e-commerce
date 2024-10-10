import BaseValidatorAuthTemplate from '../../share/validator/BaseValidatorTemplate';

export class CreateCategoryValidator extends BaseValidatorAuthTemplate<object, void> {
  protected async validate(): Promise<void> {
    return;
  }
  protected async loadEntities(): Promise<void> {
    return;
  }
  protected async process(): Promise<void> {
    return;
  }
  protected async processTransactions(): Promise<void> {
    return;
  }
}
