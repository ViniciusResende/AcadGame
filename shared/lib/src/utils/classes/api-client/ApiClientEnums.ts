/**
 * @category Utility Class
 * @module Api
 */

/**
 * Enumerated values for HTTP request caching options.
 */
export enum HttpRequestCacheEnum {
  DEFAULT = 'default',
  FORCE_CACHE = 'force-cache',
  NO_CACHE = 'no-cache',
  NO_STORE = 'no-store',
  ONLY_IF_CACHED = 'only-if-cached',
  RELOAD = 'reload',
}

/**
 * Enumerated values for HTTP credentials options.
 */
export enum HttpCredentialsEnum {
  OMIT = 'omit',
  SAME_ORIGIN = 'same-origin',
  INCLUDE = 'include',
}

/**
 * Enumerated values for HTTP request methods.
 */
export enum HttpMethodEnum {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH',
}

/**
 * Enumerated values for HTTP request mode options.
 */
export enum HttpRequestModeEnum {
  SAME_ORIGIN = 'same-origin',
  NO_CORS = 'no-cors',
  CORS = 'cors',
  NAVIGATE = 'navigate',
  WEBSOCKET = 'websocket',
}

/**
 * Enumerated values for HTTP request redirection options.
 */
export enum HttpRequestRedirectEnum {
  FOLLOW = 'follow',
  ERROR = 'error',
  MANUAL = 'manual',
}

/**
 * Enumerated values for HTTP request referrer policy options.
 */
export enum HttpRequestReferrerPolicyEnum {
  NO_REFERRER = 'no-referrer',
  NO_REFERRER_WHEN_DOWNGRADE = 'no-referrer-when-downgrade',
  ORIGIN = 'origin',
  ORIGIN_WHEN_CROSS_ORIGIN = 'origin-when-cross-origin',
  SAME_ORIGIN = 'same-origin',
  STRICT_ORIGIN = 'strict-origin',
  STRICT_ORIGIN_WHEN_CROSS_ORIGIN = 'strict-origin-when-cross-origin',
  UNSAFE_URL = 'unsafe-url',
}

/**
 * Enumerated values for common HTTP request headers.
 */
export enum HttpRequestHeaderEnum {
  ACCEPT = 'accept',
  AUTHORIZATION = 'authorization',
  CONTENT_TYPE = 'content-type',
}

/**
 * Enumerated values for common HTTP content types.
 */
export enum HttpContentTypeEnum {
  ALL = '*/*',
  JSON = 'application/json',
  TEXT = 'text/plain',
}

/**
 * Enumerated values for common HTTP response codes.
 */
export enum HttpResponseCodesEnum {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  REQUEST_TIMEOUT = 408,
  TOKEN_EXPIRED = 498,
  INTERNAL_SERVER_ERROR = 500,
}
