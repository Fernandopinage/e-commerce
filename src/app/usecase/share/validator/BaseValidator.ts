import ResultValidator from './ResultValidator';
import { HttpHeadersRequest, HttpRequest } from '../http/HttpRequest';
import { User } from '@//infra/database/models/User.entity';

export default abstract class BaseValidator<TRequest, TOutputValidator> {
  protected resultValidator: ResultValidator<TOutputValidator>;
  protected body: TRequest;
  protected headers: HttpHeadersRequest;
  protected loggedUser: User;

  constructor() {
    this.resultValidator = new ResultValidator<TOutputValidator>();
  }

  abstract executeValidations(input: HttpRequest<TRequest>): Promise<ResultValidator<TOutputValidator>>;
}
