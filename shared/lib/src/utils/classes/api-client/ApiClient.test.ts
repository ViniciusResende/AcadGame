import { ApiClient } from './ApiClient';
import {
  ApiClientHttpError,
  RequestAbortedError,
  RequestTimeoutError,
} from './ApiClientErrors';

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.mockFetch(200, true, { status: 'ok' });
    const baseMockUrl = apiClient.baseUrl + '/path';
    const abortableResponse = apiClient.fetch(baseMockUrl, {});
    const result = await abortableResponse.promise;
    const data = await result.json();
    expect(data).toEqual({ status: 'ok' });
  });

  it('should allow changing timeout limit on fetch method', async () => {
    const timeout = 1000;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.mockFetch(200, true, { status: 'ok' });
    const baseMockUrl = apiClient.baseUrl + '/path';
    const abortableResponse = apiClient.fetch(
      baseMockUrl,
      {},
      undefined,
      timeout
    );
    const result = await abortableResponse.promise;
    const data = await result.json();
    expect(data).toEqual({ status: 'ok' });
  });

  it.skip('should abort the response due to timeout', async () => {
    expect.assertions(1);
    const timeout = 1;
    apiClient = new ApiClient('https://base.url', timeout);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.mockFetch(408, false, '', 1000);
    const baseMockUrl = apiClient.baseUrl + '/path';

    const abortableResponse = apiClient.fetch(baseMockUrl, {});
    const expectedError = new RequestTimeoutError(timeout);
    await expect(abortableResponse.promise).rejects.toEqual(expectedError);
  });

  it('should throw ApiHttpError when request does not have ok status', async () => {
    expect.assertions(1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.mockFetch(401, false, { error: 'Failed to authenticate' });
    const baseMockUrl = apiClient.baseUrl + '/path';
    const expectedError = new ApiClientHttpError('Failed to authenticate', 401);

    const abortableResponse = async () =>
      await new Promise((reject) => {
        reject(apiClient.fetch(baseMockUrl, {}).promise);
      });
    await expect(abortableResponse()).rejects.toThrow(expectedError);
  });

  it('should be able to abort the response externally', async () => {
    expect.assertions(1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.mockFetch(200, true, { status: 'ok' });
    const baseMockUrl = apiClient.baseUrl + '/path';
    const abortableResponse = apiClient.fetch(baseMockUrl, {});
    abortableResponse.abort();
    const expectedError = new RequestAbortedError();
    await expect(abortableResponse.promise).rejects.toEqual(expectedError);
  });

  it('should build the URL with a query string', () => {
    const baseMockUrl = apiClient.baseUrl + '/path';
    const query = new URLSearchParams({ test: '123' });
    apiClient.fetch(baseMockUrl, {}, query);
    const expectedUrl = 'https://base.url/path?test=123';
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expect.anything());
  });
});
