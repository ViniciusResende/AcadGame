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
    const request = apiEndpoint.requestBuilder();
    expect(Object.fromEntries(request.headers)).toEqual({});
  });

  it('should return a request object with headers defined', () => {
    const request = apiEndpoint.requestBuilder({
      headers: new Headers({ 'Test-Header': '123' }),
    });
    expect(Object.fromEntries(request.headers)).toEqual({
      'test-header': '123',
    });
  });
});
