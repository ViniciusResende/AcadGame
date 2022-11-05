/**
 * @category Utility Class
 * @module Api
 */

/** Interfaces */
import { IAbortableResponse } from './ApiClientInterfaces';

/** Errors */
import {
  ApiClientError,
  RequestAbortedError,
  RequestTimeoutError,
  ApiClientHttpError,
} from './ApiClientErrors';

/**
 * Class that enables API requests for a specific context.
 */
export class ApiClient {
  #url: string;
  #timeout: number;

  constructor(baseUrl: string, timeout = 10000) {
    this.#url = baseUrl.replace(/\/$/, '');
    this.#timeout = timeout;
  }

  /**
   * Returns the base URL that is used for the API.
   *
   * @returns The base URL for the API
   */
  get baseUrl(): string {
    return this.#url;
  }

  /**
   * Returns an empty Headers object.
   *
   * This method must be overridden by a more specialized class if custom
   * headers are needed.
   *
   * @returns The headers object to be used on requests
   */
  get headers(): Headers {
    return new Headers();
  }

  /**
   * Returns the endpoint URL merging provided query string params to the base
   * URL when it applies.
   *
   * @param url - The base URL for the endpoint
   * @param query - The query string parameters object to be merged into the URL
   * @returns The base URL merged with the provided query string parameters
   */
  #getEndpointUrl(url: string, query?: URLSearchParams): string {
    const urlObject = new URL(url);
    if (query) {
      query.forEach((value, name) => {
        urlObject.searchParams.append(name, value);
      });
    }
    return urlObject.toString();
  }

  /**
   * Abort the response after the provided timeout limit.
   *
   * @param fetchReturn - Abortable response to be handled
   * @param timeout - Timeout limit in milliseconds
   */
  async #handleRequestTimeout(
    fetchReturn: IAbortableResponse<Response>,
    timeout: number
  ): Promise<void> {
    const timeoutId = setTimeout(() => {
      fetchReturn.abort(new RequestTimeoutError(timeout));
    }, timeout);
    await fetchReturn.promise;
    clearTimeout(timeoutId);
  }

  async #handleHttpError(response: Response): Promise<ApiClientHttpError> {
    const responseResolved = await response.json();
    return new ApiClientHttpError(
      responseResolved.data.message,
      response.status
    );
  }

  /**
   * Fetches data from the API.
   *
   * This method must be preferably called by an `ApiClientEndpoint` instance.
   *
   * @param request - Request object to be used for fetching
   * @param query - Query string params to be used by the request
   * @param timeout - Timeout limit in milliseconds for the request
   * @returns Abortable response object
   */
  fetch(
    baseUrl: string,
    requestInit: RequestInit,
    query?: URLSearchParams,
    timeout: number = this.#timeout
  ): IAbortableResponse<Response> {
    const controller = new AbortController();
    const { signal } = controller;
    requestInit.signal = signal;

    const url = this.#getEndpointUrl(baseUrl, query);
    let rejectPromise: (error: Error) => void;
    const promise: Promise<Response> = new Promise((resolve, reject) => {
      rejectPromise = reject;
      fetch(url, requestInit)
        .then(async (response) => {
          if (response.ok) return resolve(response);
          throw await this.#handleHttpError(response);
        })
        .catch(reject);
    });
    const fetchReturn = {
      abort: (error: ApiClientError = new RequestAbortedError()) => {
        rejectPromise(error);
        controller.abort();
      },
      promise,
    };
    this.#handleRequestTimeout(fetchReturn, timeout);
    return fetchReturn;
  }
}
