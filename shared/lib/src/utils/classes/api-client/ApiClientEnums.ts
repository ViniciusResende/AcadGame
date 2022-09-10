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
}

/**
 * Enumerated values for common HTTP content types.
 */
export enum HttpContentTypeEnum {
  ALL = '*/*',
  JSON = 'application/json',
  TEXT = 'text/plain',
}
