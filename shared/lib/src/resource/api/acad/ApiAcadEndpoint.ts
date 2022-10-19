/**
 * @category API
 * @module ApiAcad
 */

/** Interfaces */
import { IAbortableResponse } from '../../../utils/classes/api-client/ApiClientInterfaces';
import { IApiAcadResponseData } from './ApiAcadInterfaces';

/** Classes */
import { ApiEndpoint } from '../common/ApiEndpoint';

/**
 * Acad Game's general purpose API endpoint class.
 */
export class ApiAcadEndpoint extends ApiEndpoint<IApiAcadResponseData> {
  /**
   * Parses the API JSON response casting the resulting object using the
   * Acad Game API's response data interface.
   *
   * @param response - Abortable response with the promise from the fetched data
   * @returns - Parsed response data from the API response
   */
  responseTransformer(
    response: IAbortableResponse<Response>
  ): IAbortableResponse<IApiAcadResponseData> {
    const promise = new Promise<IApiAcadResponseData>((resolve, reject) => {
      response.promise.then((response) => {
        const jsonParsingPromise = response.json();
        jsonParsingPromise
          .then((data: IApiAcadResponseData) => {
            resolve(data);
          })
          .catch(reject);
      });
      response.promise.catch(reject);
    });
    const transformedResponse: IAbortableResponse<IApiAcadResponseData> = {
      abort: response.abort,
      promise,
    };
    return transformedResponse;
  }
}
