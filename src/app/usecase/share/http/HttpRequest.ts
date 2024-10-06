export type HttpRequest<TBody> = {
  body?: TBody;
  headers?: HttpHeadersRequest;
};

export type HttpHeadersRequest = {
  token?: string;
};
