import { HttpStatus } from '@nestjs/common';

import { LanguageEnum } from '../enum/LanguageEnum';
import CommonErrors from '../erros/CommonErrors';
import ManagerErrors from '../erros/ManagerErrors';
import { HttpRequest } from '../http/HttpRequest';
import { HttpResponse } from '../http/HttpResponse';
import StatusCode from '../status/StatusCode';
import BaseValidator from '../validator/BaseValidator';
import ResultValidator from '../validator/ResultValidator';
import { User } from '@/infra/database/models/User.entity';

export abstract class BaseGetUseCaseTempate<TQueryParam, TResponse = void, TOutputValidator = void> {
  protected queryParams: TQueryParam;
  private response: HttpResponse<TResponse>;
  protected resultValidator: ResultValidator<TOutputValidator>;
  protected headers: HttpRequest<TQueryParam>['headers'];
  protected loggedUser: User;
  // protected loggedMonitored: Monitored;

  constructor(private validator?: BaseValidator<TQueryParam, TOutputValidator>) {}

  async execute(httpRequest: HttpRequest<TQueryParam>): Promise<HttpResponse<TResponse>> {
    try {
      this.headers = httpRequest.headers;
      this.queryParams = httpRequest.body!;

      if (httpRequest.loggedUser) {
        this.loggedUser = httpRequest.loggedUser;
      }

      // if (httpRequest.loggedMonitored) {
      //   this.loggedMonitored = httpRequest.loggedMonitored;
      // }

      if (this.validator) {
        this.resultValidator = await this.validator.executeValidations(httpRequest);
        if (this.resultValidator.hasError()) {
          return this.resultValidator.getHttpResult();
        }
      }

      await this.process();

      if (!this.response) {
        throw new Error('Response not defined');
      }

      return {
        body: this.response.body,
        statusCode: HttpStatus.OK
      };
    } catch (error) {
      //   Logger.error(error, error, ConsoleLogContextsEnum.usecase);
      return {
        statusCode: StatusCode.serveError,
        body: [ManagerErrors.translate(LanguageEnum.ptbr, CommonErrors.serverError), error]
      };
    }
  }

  protected abstract process(): Promise<void>;

  protected setResponseBody(body: TResponse): void {
    this.response = { ...this.response, body };
  }
}
