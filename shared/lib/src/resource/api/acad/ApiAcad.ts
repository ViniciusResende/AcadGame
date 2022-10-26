/**
 * @category API
 * @module ApiAcad
 */

/** Enums */
import {
  HttpContentTypeEnum,
  HttpMethodEnum,
  HttpRequestHeaderEnum,
} from '../../../utils/classes/api-client/ApiClientEnums';
import { UserProfilePictureEnum } from '../../../data/enums/UserEnums';

/** Interfaces */
import {
  IApiAcadAuthResponse,
  IApiUserGetDataInfoResponse,
  IApiUserGetDataWeeklyHistogramResponse,
} from './ApiAcadInterfaces';
import { IApiClientRequestParams } from '../../../utils/classes/api-client/ApiClientInterfaces';

/** Classes */
import { ApiClient } from '../../../utils/classes/api-client/ApiClient';
import { ApiAcadEndpoint } from './ApiAcadEndpoint';

/**
 * AcadGame's API class.
 */
export class ApiAcad extends ApiClient {
  #api: ApiAcadEndpoint;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.#api = new ApiAcadEndpoint(this, { uri: '/api' });
  }

  #getAuthHeader(token: string) {
    return new Headers({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Returns the HTTP Headers object to be used on requests.
   *
   * @returns - The headers object for API requests
   */
  get headers(): Headers {
    const headersExtension = {
      [HttpRequestHeaderEnum.ACCEPT]: [
        HttpContentTypeEnum.JSON,
        HttpContentTypeEnum.TEXT,
        HttpContentTypeEnum.ALL,
      ].join(', '),
    };
    return new Headers(
      Object.assign(
        Object.fromEntries(super.headers.entries()),
        headersExtension
      )
    );
  }

  /**
   * Fetches the API providing a user and password payload.
   *
   * @param username - The username of the user being authenticated
   * @param password - The password of the user being authenticated
   * @returns - The JWT token when user is authenticated
   */
  async login(
    username: string,
    password: string
  ): Promise<IApiAcadAuthResponse> {
    const requestParams: IApiClientRequestParams = {
      body: {
        username,
        password,
      },
      method: HttpMethodEnum.POST,
    };
    const response = this.#api.request('/auth', requestParams);
    const responseData = await response.promise;
    const loginResponse = responseData.data as IApiAcadAuthResponse;

    return loginResponse;
  }

  /**
   * Fetches the API providing a nickname, email and password payload.
   *
   * @param nickname - The nickname of the user being created
   * @param email - The nickname of the user being created
   * @param password - The password of the user being created
   * @returns - The JWT token when user is created successfully
   */
  async signUp(
    nickname: string,
    email: string,
    password: string
  ): Promise<IApiAcadAuthResponse> {
    const requestParams: IApiClientRequestParams = {
      body: {
        nickname,
        email,
        password,
      },
      method: HttpMethodEnum.POST,
    };
    const response = this.#api.request('/signUp', requestParams);
    const responseData = await response.promise;
    const signUpResponse = responseData.data as IApiAcadAuthResponse;

    return signUpResponse;
  }

  /**
   * Fetches the API providing a header token and getting user info.
   *
   * @param token - The token to be used to authenticate user
   * @returns - The User info from provided token
   */
  async userInfo(token: string): Promise<IApiUserGetDataInfoResponse> {
    const requestParams: IApiClientRequestParams = {
      headers: this.#getAuthHeader(token),
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request('/user/info', requestParams);
    const responseData = await response.promise;
    const userInfoResponse = responseData.data as IApiUserGetDataInfoResponse;

    return userInfoResponse;
  }

  /**
   * Fetches the API providing a header token and getting user info.
   *
   * @param token - The token to be used to authenticate user
   * @param nickname - The new nickname to be saved
   * @param picture - The new picture to be save
   * @returns - The User info from provided token
   */
  async updateUserInfo(
    token: string,
    nickname: string,
    picture: UserProfilePictureEnum
  ): Promise<IApiUserGetDataInfoResponse> {
    const requestParams: IApiClientRequestParams = {
      headers: this.#getAuthHeader(token),
      body: {
        nickname,
        picture,
      },
      method: HttpMethodEnum.POST,
    };
    const response = this.#api.request('/user/info', requestParams);
    const responseData = await response.promise;
    const userInfoSavedResponse =
      responseData.data as IApiUserGetDataInfoResponse;

    return userInfoSavedResponse;
  }

  /**
   * Fetches the API providing a header token and getting user weekly histogram.
   *
   * @param token - The token to be used to authenticate user
   * @returns - The User weekly histogram from provided token
   */
  async userWeeklyHistogram(
    token: string
  ): Promise<IApiUserGetDataWeeklyHistogramResponse> {
    const requestParams: IApiClientRequestParams = {
      headers: this.#getAuthHeader(token),
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request('/user/weeklyHistogram', requestParams);
    const responseData = await response.promise;
    const userInfoResponse =
      responseData.data as IApiUserGetDataWeeklyHistogramResponse;

    return userInfoResponse;
  }
}
