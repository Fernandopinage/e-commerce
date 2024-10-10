import { LanguageEnum } from '../enum/LanguageEnum';
import { ErrorMessage, ErrorMessageWithTranslations } from '../http/ErrorMessage';

export default class ManagerErrors {
  static translate(language: LanguageEnum, error: ErrorMessageWithTranslations): ErrorMessage {
    const message = error.message.find((m) => m.language === language);
    return {
      message: message?.value ?? '',
      code: error.code
    };
  }
}
