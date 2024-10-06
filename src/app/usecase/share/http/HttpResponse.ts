import { ErrorMessage } from './ErrorMessage';

export type HttpResponse<TBody, THeaders = undefined> = {
  statusCode: number;
  body?: TBody | ErrorMessage[];
  headers?: THeaders;
};
