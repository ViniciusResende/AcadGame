/**
 * @category Utility Class
 * @module Api
 */

/** Types */
import { UrlParams } from './ApiClientTypes';

/** Interfaces */
import {
  IApiClientEndpoint,
  IAbortableResponse,
  IApiClientRequestDetails,
  IApiClientRequestParams,
} from './ApiClientInterfaces';

/** Classes */
import { ApiClient } from './ApiClient';

/**
 * Class which enables the creation of custom endpoint requests for the API
 * client.
 */
export abstract class ApiClientEndpoint<ResponseType> {
  #apiClientRef: ApiClient;
  #requestEndpoint: IApiClientEndpoint;
  #ongoingRequestsSet: Set<IApiClientRequestDetails<ResponseType>>;

  constructor(apiClient: ApiClient, endpoint: IApiClientEndpoint) {
    this.#apiClientRef = apiClient;
    this.#requestEndpoint = endpoint;
    this.#ongoingRequestsSet = new Set<
      IApiClientRequestDetails<ResponseType>
    >();
  }

  /**
   * Builds a request object with a custom implementation that processes the
   * provided request parameters.
   * This method must be implemented by a more specialized class.
   *
   * @virtual
   * @param requestParams - Parameters to be applied to the transformation
   * @returns - Transformed Request object
   */
  abstract requestBuilder(
    requestParams: IApiClientRequestParams
  ): [string, RequestInit];

  /**
   * Transforms the provided abortable response object with a custom
   * implementation.
   * This method must be implemented by a more specialized class.
   *
   * @virtual
   * @param response - The response object to be transformed
   * @returns - Transformed abortable response object
   */
  abstract responseTransformer(
    response: IAbortableResponse<ResponseType | Response>
  ): IAbortableResponse<ResponseType>;

  /**
   * Returns the API Client instance responsible for sending the requests.
   *
   * @returns - API Client instance
   */
  get apiClient(): ApiClient {
    return this.#apiClientRef;
  }

  /**
   * Returns the endpoint details (uri and default parameters).
   *
   * @returns - Endpoint details
   */
  get endpoint(): IApiClientEndpoint {
    return this.#requestEndpoint;
  }

  /**
   * Returns an array containing the details for all the ongoing requests which
   * can have their response aborted.
   *
   * @returns - Ongoing requests' details
   */
  get ongoingRequests(): IApiClientRequestDetails<ResponseType>[] {
    return Array.from(this.#ongoingRequestsSet);
  }

  /**
   * Builds the URL by parsing the provided URL parameters and replacing the
   * respective placeholders on the provided URL string.
   *
   * @param url - Base URL string containing parameters placeholders
   * @param urlParams - URL parameters' key-value pair object
   * @returns - Parsed URL
   */
  #buildUrlWithParams(url: string, urlParams?: UrlParams): string {
    let resultUrl = url;
    if (urlParams) {
      Object.keys(urlParams).forEach((paramKey) => {
        const key = paramKey.replace(/[^0-9A-Z\-_]/gi, '');
        const paramValue = encodeURI(urlParams[key]);
        const paramSearchKey = '${' + key + '}';
        resultUrl = resultUrl.replaceAll(paramSearchKey, paramValue);
      });
    }
    return resultUrl;
  }

  /**
   * Adds the provided request to the ongoing requests array and remove it when
   * the request is fulfilled.
   *
   * @param requestDetails - The request details object
   */
  async #handleOngoingRequest(
    requestDetails: IApiClientRequestDetails<ResponseType>
  ): Promise<void> {
    this.#ongoingRequestsSet.add(requestDetails);
    await requestDetails.response.promise;
    this.#ongoingRequestsSet.delete(requestDetails);
  }

  /**
   * Sends an request to the API, returning an abortable response object.
   *
   * @param path - Path to be appended to the endpoint URI
   * @param requestParams - Additional parameters for the request
   * @returns - Abortable response for the created request
   */
  request(
    path: string,
    requestParams: IApiClientRequestParams = {}
  ): IAbortableResponse<ResponseType> {
    const [baseRequestUrl, baseRequestInit] =
      this.requestBuilder(requestParams);
    const uri = this.endpoint.uri + path;
    const requestUrl = this.#buildUrlWithParams(
      baseRequestUrl + uri,
      requestParams.urlParams
    );
    const response = this.apiClient.fetch(
      requestUrl,
      baseRequestInit,
      requestParams.query,
      requestParams.timeout
    );
    const request = new Request(
      this.#buildUrlWithParams(baseRequestUrl + uri, requestParams.urlParams),
      { ...baseRequestInit, body: null }
    );
    const customResponse: IAbortableResponse<ResponseType> = {
      abort: response.abort,
      promise: this.responseTransformer(response).promise,
    };
    const requestDetails: IApiClientRequestDetails<ResponseType> = {
      path,
      request,
      requestParams,
      response: customResponse,
    };
    this.#handleOngoingRequest(requestDetails);
    return customResponse;
  }
}
