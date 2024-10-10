import { LanguageEnum } from '../enum/LanguageEnum';
import ManagerErrors from '../erros/ManagerErrors';
import { ErrorMessage, ErrorMessageWithTranslations } from '../http/ErrorMessage';
import { HttpResponse } from '../http/HttpResponse';
import StatusCode from '../status/StatusCode';

export type ResultValidatorDeprecated = {
  statusCode: number;
  errors?: ErrorMessage[];
};

export default class ResultValidator<TOutput> {
  output: Partial<TOutput> = {};
  private statusCode: number;
  private errorMessages: ErrorMessage[] = [];

  addError(errorMessage: ErrorMessageWithTranslations, statusCode?: number) {
    this.errorMessages.push(ManagerErrors.translate(LanguageEnum.ptbr, errorMessage));
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }

  addWithPlaceholder(
    errorMessage: ErrorMessageWithTranslations,
    placeholders: { [k: string]: string | number },
    statusCode?: number
  ): void {
    this.errorMessages.push({
      code: errorMessage.code,
      message: this.replacePlaceholders(ManagerErrors.translate(LanguageEnum.ptbr, errorMessage).message, placeholders)
    });
    this.statusCode = statusCode ?? this.statusCode;
  }

  private replacePlaceholders(text: string, placeholders: { [k: string]: string | number }): string {
    for (const propertyName in placeholders) {
      const rexex = new RegExp('{' + propertyName + '}', 'gm');
      text = text.replace(rexex, placeholders[propertyName].toString());
    }
    return text;
  }

  addMultipleErrors(errorMessage: ErrorMessage[], statusCode?: number) {
    this.errorMessages = [...this.errorMessages, ...errorMessage];
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }

  hasError(): boolean {
    return this.errorMessages.length > 0 || !!this.statusCode;
  }

  getHttpResult<T>(): HttpResponse<T> {
    if (this.errorMessages && this.errorMessages.length > 0 && !this.statusCode) {
      this.statusCode = StatusCode.badRequest;
    }
    return {
      statusCode: this.statusCode,
      body: this.errorMessages
    };
  }
}
