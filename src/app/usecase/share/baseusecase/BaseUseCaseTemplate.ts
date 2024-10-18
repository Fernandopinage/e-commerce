import { Logger } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';

import { ConsoleLogContextsEnum } from '../enum/ConsoleLogContextsEnum';
import { LanguageEnum } from '../enum/LanguageEnum';
import CommonErrors from '../erros/CommonErrors';
import ManagerErrors from '../erros/ManagerErrors';
import { ErrorMessage } from '../http/ErrorMessage';
import { HttpRequest } from '../http/HttpRequest';
import { HttpResponse } from '../http/HttpResponse';
import StatusCode from '../status/StatusCode';
import BaseValidator from '../validator/BaseValidator';
import ResultValidator from '../validator/ResultValidator';
import postgresDataSource from '@/infra/database/config/datasource';
import { BaseRepository } from '@/infra/repositories/shared/BaseRepository';

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
    if (!postgresDataSource.isInitialized) {
      await postgresDataSource.initialize();
    }
    const queryRunner: QueryRunner = postgresDataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      this.headers = httpRequest.headers;
      this.body = httpRequest.body!;
      if (this.validator) {
        this.resultValidator = await this.validator.executeValidations(httpRequest);
        if (this.resultValidator.hasError()) {
          return this.resultValidator.getHttpResult();
        }
      }

      const entityManager: EntityManager = queryRunner.manager;
      if (this.repositories) {
        this.repositories.forEach((r) => r.setEntityManager(entityManager));
      }
      await this.processTransactions();
      await queryRunner.commitTransaction();

      await this.process();

      return {
        body: this.response?.body,
        statusCode: this.response?.statusCode ?? null
      };
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      let errorToLog = error;
      if (JSON.stringify(error) === '{}') {
        errorToLog = { error: error?.stack };
      }

      // Log do erro (comentado para exemplo)
      Logger.error(error, error, ConsoleLogContextsEnum.usecase);

      return {
        statusCode: StatusCode.serveError,
        body: [ManagerErrors.translate(LanguageEnum.ptbr, CommonErrors.serverError), errorToLog]
      };
    } finally {
      await queryRunner.release(); // Libera o QueryRunner
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
