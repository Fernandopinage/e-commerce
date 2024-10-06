import { HttpRequest } from '../http/HttpRequest';
import { HttpResponse } from '../http/HttpResponse';
import StatusCode from '../status/StatusCode';

export abstract class BaseUseCaseTemplate<TBodyRequest, TResponse = void> {
  protected body: TBodyRequest;
  private response: HttpResponse<TResponse>;
  // protected resultValidator: ResultValidator<TOutputValidator>;
  protected headers: HttpRequest<TBodyRequest>['headers'];

  constructor() {} // private validator?: BaseValidator<TBodyRequest, TOutputValidator> // private repositories?: BaseRepository[],

  async execute(httpRequest: HttpRequest<TBodyRequest>): Promise<HttpResponse<TResponse>> {
    try {
      this.headers = httpRequest.headers;
      this.body = httpRequest.body!;

      // if (this.validator) {
      //   this.resultValidator = await this.validator.executeValidations(httpRequest);
      //   if (this.resultValidator.hasError()) {
      //     return this.resultValidator.getHttpResult();
      //   }
      // }

      await this.process();
      await this.processTransactions();

      return {
        body: this.response?.body,
        statusCode: this.response?.statusCode ?? null
      };
    } catch (error) {
      console.log('>>>>>', error);
      // Logger.error(error, error, ConsoleLogContextsEnum.usecase);
      return {
        statusCode: StatusCode.serveError
        // body: [ManagerErrors.translate(LanguageEnum.ptbr, CommonErrors.serverError), error]
      };
    }
  }

  protected abstract process(): Promise<void>;

  protected abstract processTransactions(): Promise<void>;

  protected setResponseStatusCode(statusCode: number): void {
    this.response = { ...this.response, statusCode };
  }

  protected setResponseBody(body: TResponse): void {
    this.response = { ...this.response, body };
  }
}
