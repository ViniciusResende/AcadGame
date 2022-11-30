import { ApiClient } from './ApiClient';
import { ApiClientEndpoint } from './ApiClientEndpoint';
import { HttpMethodEnum } from './ApiClientEnums';
import {
  IAbortableResponse,
  IApiClientRequestParams,
} from './ApiClientInterfaces';

interface IApiEndpointResponseData {
  data: string;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 
if (typeof String.prototype.replaceAll === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  String.prototype.replaceAll = function (match: string, replace: string) {
    return this.replace(new RegExp(match, 'g'), () => replace);
  };
}

class ApiEndpoint extends ApiClientEndpoint<IApiEndpointResponseData> {
  requestBuilder(
    _requestParams: IApiClientRequestParams = {}
  ): [string, RequestInit] {
    return [this.apiClient.baseUrl, {}];
  }

  responseTransformer(
    response: IAbortableResponse<Response>
  ): IAbortableResponse<IApiEndpointResponseData> {
    return {
      abort: response.abort,
      promise: Promise.resolve({ data: 'testData' }),
    };
  }
}

describe('ApiClientEndpoint', () => {
  let apiClient: ApiClient;
  let apiEndpoint: ApiClientEndpoint<IApiEndpointResponseData>;

  beforeEach(() => {
    jest.clearAllMocks();
    apiClient = new ApiClient('https://base.url');
    apiEndpoint = new ApiEndpoint(apiClient, { uri: '/path' });
  });

  it('should instantiate ApiClientEndpoint', () => {
    expect(apiEndpoint).toBeInstanceOf(ApiClientEndpoint);
  });

  it('should get the apiClient reference', () => {
    expect(apiEndpoint.apiClient).toBe(apiClient);
  });

  it('should get the endpoint object', () => {
    expect(apiEndpoint.endpoint).toEqual({ uri: '/path' });
  });

  it('should be able to request', () => {
    const fetchSpy = jest.spyOn(apiClient, 'fetch');
    const abortableResponse = apiEndpoint.request('/test');
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://base.url/path/test',
      { signal: expect.any(Object) },
      undefined,
      undefined
    );
    expect(abortableResponse).toEqual(
      expect.objectContaining({
        abort: expect.any(Function),
        promise: expect.any(Promise),
      })
    );
  });

  it('should be able to request with URL params', () => {
    const fetchSpy = jest.spyOn(apiClient, 'fetch');
    const abortableResponse = apiEndpoint.request('/test/${id}', {
      urlParams: { id: '123' },
    });
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://base.url/path/test/${id}',
      { signal: expect.any(Object) },
      undefined,
      undefined
    );
    expect(abortableResponse).toEqual(
      expect.objectContaining({
        abort: expect.any(Function),
        promise: expect.any(Promise),
      })
    );
  });

  it('should be able to monitor ongoing requests', () => {
    const responseA = apiEndpoint.request('/resourceA');
    const requestBQueryParams = new URLSearchParams({ id: '123' });
    const responseB = apiEndpoint.request('/resourceB', {
      method: HttpMethodEnum.POST,
      query: requestBQueryParams,
    });
    const { ongoingRequests } = apiEndpoint;
    expect(ongoingRequests).toHaveLength(2);
    expect(ongoingRequests[0]).toEqual(
      expect.objectContaining({
        path: '/resourceA',
        request: expect.any(Request),
        requestParams: {},
        response: responseA,
      })
    );
    expect(ongoingRequests[1]).toEqual(
      expect.objectContaining({
        path: '/resourceB',
        request: expect.any(Request),
        requestParams: {
          method: HttpMethodEnum.POST,
          query: requestBQueryParams,
        },
        response: responseB,
      })
    );
  });
});
