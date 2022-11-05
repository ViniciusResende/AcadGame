/**
 * @category Interface
 * @module CommonInterfaces
 */

/**
 * Class interface to be used as type.
 */
export interface IClass<T> {
  new (...args: unknown[]): T;
}

/**
 * General configuration for the library.
 */
export interface ILibConfiguration {
  baseApiUrl?: string;
}

/**
 * General Error  Payload body.
 */
export interface ILibGeneralErrorPayload {
  errorCode: number;
  errorMessage: string;
}
