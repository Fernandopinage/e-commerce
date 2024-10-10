import { LanguageEnum } from '../enum/LanguageEnum';

export type ErrorMessage = {
  message: string;
  code: string;
};

export type ErrorMessageWithTranslations = {
  message: Array<{
    language: LanguageEnum;
    value: string;
  }>;
  code: string;
};
