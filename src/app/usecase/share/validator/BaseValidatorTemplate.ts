import BaseValidator from './BaseValidator';
import ResultValidator from './ResultValidator';
import { HttpRequest } from '../http/HttpRequest';

export default abstract class BaseValidatorAuthTemplate<TBody, TOutputValidator> extends BaseValidator<
  TBody,
  TOutputValidator
> {
  protected resultValidator: ResultValidator<TOutputValidator>;

  async executeValidations(input: HttpRequest<TBody>): Promise<ResultValidator<TOutputValidator>> {
    this.body = input.body!;
    this.headers = input.headers!;
    this.loggedUser = input.loggedUser!;

    if (this.resultValidator.hasError()) {
      return this.resultValidator;
    }

    await this.loadEntities();
    await this.validate();

    return this.resultValidator;
  }

  protected abstract validate(): Promise<void>;

  protected abstract loadEntities(): Promise<void>;
}
