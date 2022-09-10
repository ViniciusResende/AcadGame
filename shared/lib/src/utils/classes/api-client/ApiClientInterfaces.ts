/**
 * @category Utility Class
 * @module Api
 */

/** Types */
import { UrlParams } from './ApiClientTypes';

/** Enums */
import { HttpMethodEnum } from './ApiClientEnums';

/** Errors */
import { ApiClientError } from './ApiClientErrors';

export interface IAbortableResponse<ResponseType> {
  abort: (error?: ApiClientError) => void;
  promise: Promise<ResponseType>;
}

/**
 * Data representation for API client endpoint object, containing the uri path
 * for the endpoint and specific parameters for the requests.
 */
export interface IApiClientEndpoint {
  uri: string;
  defaultParams?: IApiClientRequestParams;
}

/**
 * Data representation for request parameters like HTTP method, headers, URL
 * parameter values, query string, timeout and general request options.
 */
export interface IApiClientRequestParams {
  method?: HttpMethodEnum;
  headers?: Headers;
  urlParams?: UrlParams;
  query?: URLSearchParams;
  timeout?: number;
  options?: RequestInit;
}

/**
 * Data representation for the details of a request that has been sent to the
 * API, containing the path used, the Request object, the parameters used and
 * the abortable response object.
 */
export interface IApiClientRequestDetails<ResponseType> {
  path: string;
  request: Request;
  requestParams: IApiClientRequestParams;
  response: IAbortableResponse<ResponseType>;
}
