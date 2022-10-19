import { ApiClient } from './ApiClient';
import { RequestAbortedError, RequestTimeoutError } from './ApiClientErrors';

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    jest.clearAllMocks();
    apiClient = new ApiClient('https://base.url');
  });

  it('should instantiate ApiClient', () => {
    expect(apiClient).toBeInstanceOf(ApiClient);
  });

  it('should set the base URL', () => {
    expect(apiClient.baseUrl).toBe('https://base.url');
  });

  it('should build HTTP headers', () => {
    const { headers } = apiClient;
    expect(Object.fromEntries(headers.entries())).toEqual({});
  });

  it('should be able to fetch data', async () => {
    global.mockFetch(200, { status: 'ok' });
    const request = new Request(apiClient.baseUrl + '/path');
    const abortableResponse = apiClient.fetch(request);
    const result = await abortableResponse.promise;
    const data = await result.json();
    expect(data).toEqual({ status: 'ok' });
  });

  it('should allow changing timeout limit on fetch method', async () => {
    const timeout = 1000;
    global.mockFetch(200, { status: 'ok' });
    const request = new Request(apiClient.baseUrl + '/path');
    const abortableResponse = apiClient.fetch(request, undefined, timeout);
    const result = await abortableResponse.promise;
    const data = await result.json();
    expect(data).toEqual({ status: 'ok' });
  });

  it('should abort the response due to timeout', async () => {
    expect.assertions(1);
    const timeout = 1;
    apiClient = new ApiClient('https://base.url', timeout);
    global.mockFetch(408, '', 1000);
    const request = new Request(apiClient.baseUrl + '/path');
    const abortableResponse = apiClient.fetch(request);
    const expectedError = new RequestTimeoutError(timeout);
    await expect(abortableResponse.promise).rejects.toEqual(expectedError);
  });

  it('should be able to abort the response externally', async () => {
    expect.assertions(1);
    global.mockFetch(200, { status: 'ok' });
    const request = new Request(apiClient.baseUrl + '/path');
    const abortableResponse = apiClient.fetch(request);
    abortableResponse.abort();
    const expectedError = new RequestAbortedError();
    await expect(abortableResponse.promise).rejects.toEqual(expectedError);
  });

  it('should build the URL with a query string', () => {
    const request = new Request(apiClient.baseUrl + '/path');
    const query = new URLSearchParams({ test: '123' });
    apiClient.fetch(request, query);
    const expectedUrl = 'https://base.url/path?test=123';
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expect.anything());
  });
});
