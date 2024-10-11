import { ErrorMessage } from '../http/ErrorMessage';
import { HttpRequest } from '../http/HttpRequest';
import { HttpResponse } from '../http/HttpResponse';
import StatusCode from '../status/StatusCode';
import BaseValidator from '../validator/BaseValidator';
import ResultValidator from '../validator/ResultValidator';
import postgresDataSource from '@//infra/database/config/datasource';
import { BaseRepository } from '@//infra/repositories/shared/BaseRepository';

export abstract class BaseUseCaseTemplate<TBodyRequest, TResponse = void, TOutputValidator = void> {
  protected body: TBodyRequest;
  private response: HttpResponse<TResponse>;
  protected resultValidator: ResultValidator<TOutputValidator>;
  protected headers: HttpRequest<TBodyRequest>['headers'];

  constructor(
    private repositories?: BaseRepository[],
    private validator?: BaseValidator<TBodyRequest, TOutputValidator>
  ) {}

  async execute(httpRequest: HttpRequest<TBodyRequest>): Promise<HttpResponse<TResponse>> {
    try {
      this.headers = httpRequest.headers;
      this.body = httpRequest.body!;

      if (this.validator) {
        this.resultValidator = await this.validator.executeValidations(httpRequest);
        if (this.resultValidator.hasError()) {
          return this.resultValidator.getHttpResult();
        }
      }

      await this.process();

      await postgresDataSource.manager.transaction(async (entityManager) => {
        if (this.repositories) {
          this.repositories.forEach((r) => r.setEntityManager(entityManager));
          await this.processTransactions();
        }
      });

      return {
        body: this.response?.body,
        statusCode: this.response?.statusCode ?? null
      };
    } catch (error) {
      let errorToLog = error;
      if (JSON.stringify(error) === '{}') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        errorToLog = { error: error?.stack };
      }
      // Logger.error(error, error, ConsoleLogContextsEnum.usecase);
      return {
        statusCode: StatusCode.serveError
        // body: [ManagerErrors.translate(LanguageEnum.ptbr, CommonErrors.serverError), errorToLog]
      };
    }
  }

  protected abstract process(): Promise<void>;

  protected abstract processTransactions(): Promise<void>;

  protected setResponseStatusCode(statusCode: number): void {
    this.response = { ...this.response, statusCode };
  }

  protected setResponseBody(body: TResponse | ErrorMessage[]): void {
    this.response = { ...this.response, body };
  }
}
