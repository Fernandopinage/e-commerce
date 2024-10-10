import { User } from '@//infra/database/models/User.entity';

export type HttpRequest<TBody> = {
  loggedUser?: User;
  body?: TBody;
  headers?: HttpHeadersRequest;
};

export type HttpHeadersRequest = {
  token?: string;
};
