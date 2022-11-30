import { ApiClient } from '../../../utils/classes/api-client/ApiClient';
import { IAbortableResponse } from '../../../utils/classes/api-client/ApiClientInterfaces';
import { ApiEndpoint } from './ApiEndpoint';

interface IApiTestEndpointResponseData {
  data: string;
}

class ApiTestEndpoint extends ApiEndpoint<IApiTestEndpointResponseData> {
  responseTransformer(): IAbortableResponse<IApiTestEndpointResponseData> {
    return;
  }
}

describe('ApiEndpoint', () => {
  let apiEndpoint: ApiEndpoint<IApiTestEndpointResponseData>;

  beforeEach(() => {
    jest.clearAllMocks();
    const apiClient = new ApiClient('http://test.tst');
    apiEndpoint = new ApiTestEndpoint(apiClient, { uri: '/test-uri' });
  });

  it('should instantiate ApiEndpoint', () => {
    expect(apiEndpoint).toBeInstanceOf(ApiEndpoint);
  });

  it('should return a request object without headers defined', () => {
    const [requestUrl, requestInit] = apiEndpoint.requestBuilder();
    expect(requestUrl).toEqual('http://test.tst');
    expect(requestInit.headers).toEqual({ map: {} });
    expect(requestInit.body).toEqual(null);
  });

  it('should return a request object with headers defined', () => {
    const [_requestUrl, requestInit] = apiEndpoint.requestBuilder({
      headers: new Headers({ 'Test-Header': '123' }),
    });
    expect(requestInit.headers).toEqual(
      new Headers({
        'test-header': '123',
      })
    );
  });

  it('should return a request object with body defined', () => {
    const [_requestUrl, requestInit] = apiEndpoint.requestBuilder({
      body: { userId: '123', name: 'newName' },
    });
    expect(requestInit.body).toEqual('{"userId":"123","name":"newName"}');
  });
});
