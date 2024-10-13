import { LanguageEnum } from '../enum/LanguageEnum';
import { ErrorMessageWithTranslations } from '../http/ErrorMessage';

export default class CommonErrors {
  static serverError: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'Ocorreu um erro interno no servidor'
      }
    ],
    code: 'ERROR-COMMON-1000'
  };

  static requiredFields: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'Necessário preencher todos os campos obrigatorios'
      }
    ],
    code: 'ERROR-COMMON-1001'
  };

  static cpfInvalid: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'Cpf invalido'
      }
    ],
    code: 'ERROR-COMMON-1002'
  };

  static cpfDuplicated: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'CPF duplicado'
      }
    ],
    code: 'ERROR-COMMON-1003'
  };

  static pageInvalid: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: `O parâmetro 'page' é obrigatório `
      }
    ],
    code: 'ERROR-COMMON-1004'
  };

  static perPageInvalid: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: `O parâmetro perPage é obrigatório `
      }
    ],
    code: 'ERROR-COMMON-1005'
  };

  static requiredFieldsContact: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'É necessário preencher todos os campos referentes ao contato.'
      }
    ],
    code: 'ERROR-COMMON-1006'
  };

  static requiredSpecificField: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'É necessário preencher o campo {field}.'
      }
    ],
    code: 'ERROR-COMMON-1007'
  };
  static invalidDate: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'Campo de data "{field}" não é válido.'
      }
    ],
    code: 'ERROR-COMMON-1008'
  };

  static invalidLength: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'São necessários pelo menos {min} caracteres, com um máximo de {max} no campo {field}'
      }
    ],
    code: 'ERROR-COMMON-1009'
  };

  static dateInvalid: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'Formato de data inválido'
      }
    ],
    code: 'ERROR-COMMON-1010'
  };

  static userInvalid: ErrorMessageWithTranslations = {
    message: [
      {
        language: LanguageEnum.ptbr,
        value: 'Usuário duplicado'
      }
    ],
    code: 'ERROR-COMMON-1011'
  };
}
