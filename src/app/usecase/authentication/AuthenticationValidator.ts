import { AuthenticationRequest } from './AuthenticationDto';
import BaseValidatorAuthTemplate from '../share/validator/BaseValidatorTemplate';

export class AuthenticationValidator extends BaseValidatorAuthTemplate<AuthenticationRequest, void> {
  constructor() {
    super();
  }
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
