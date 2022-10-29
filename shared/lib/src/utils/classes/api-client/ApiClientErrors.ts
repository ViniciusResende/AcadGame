/**
 * @category Utility Class
 * @module Api
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to API client implementation.
 */
export class ApiClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * Class which extends the base ApiClientError and represents an error that is
 * thrown after the request timed out.
 */
export class RequestTimeoutError extends ApiClientError {
  constructor(timeoutInMs: number) {
    const timeoutInSeconds = Math.round(timeoutInMs / 1000);
    super(`Request timed out after ${timeoutInSeconds} seconds`);
    this.name = 'RequestTimeoutError';
  }
}

/**
 * Class which extends the base ApiClientError and represents an error that is
 * thrown when the request was aborted before its completion.
 */
export class RequestAbortedError extends ApiClientError {
  constructor() {
    super('Request aborted');
    this.name = 'RequestAbortedError';
  }
}

export class ApiClientHttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiClientHttpError';
    this.statusCode = statusCode;
  }
}
