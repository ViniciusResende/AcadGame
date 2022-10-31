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
  IApiAcadExercisesSheetGetAvailableToAddResponse,
  IApiAcadExercisesSheetGetUserSheetResponse,
  IApiUserGetDataInfoResponse,
  IApiUserGetDataWeeklyHistogramResponse,
} from './ApiAcadInterfaces';
import { IApiClientRequestParams } from '../../../utils/classes/api-client/ApiClientInterfaces';
import { ISheetExerciseInfo } from '../../../data/interfaces/ExercisesSheetInterfaces';

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
    const authHeaderExtension = {
      [HttpRequestHeaderEnum.AUTHORIZATION]: `Bearer ${token}`,
    };

    return new Headers(
      Object.assign(
        Object.fromEntries(this.headers.entries()),
        authHeaderExtension
      )
    );
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
      [HttpRequestHeaderEnum.CONTENT_TYPE]: [
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
      headers: this.headers,
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
      method: HttpMethodEnum.PUT,
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

  async exercisesSheetGetUserSheets(
    token: string
  ): Promise<IApiAcadExercisesSheetGetUserSheetResponse[]> {
    const requestParams: IApiClientRequestParams = {
      headers: this.#getAuthHeader(token),
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request(`/exercisesSheet`, requestParams);
    const responseData = await response.promise;

    const exercisesSheetArray = (() => {
      const resData = responseData.data as Record<string, ISheetExerciseInfo[]>;
      const sheetsIds = Object.keys(resData);

      return sheetsIds.map((sheetId) => ({
        sheetId,
        exercises: resData[sheetId],
      }));
    })();

    return exercisesSheetArray;
  }

  async exercisesSheetUpdateExercise(
    token: string,
    sheetId: string,
    updatedExercise: ISheetExerciseInfo
  ): Promise<ISheetExerciseInfo> {
    const requestParams: IApiClientRequestParams = {
      headers: this.#getAuthHeader(token),
      method: HttpMethodEnum.PUT,
    };
    const response = this.#api.request(
      `/exercisesSheet/${sheetId}/update/${updatedExercise.exerciseId}`,
      requestParams
    );
    const responseData = await response.promise;
    const exerciseUpdateResponse = responseData.data as ISheetExerciseInfo;

    return exerciseUpdateResponse;
  }

  /**
   * Fetches the API providing a header token and getting the available exercises
   * for a given sheet.
   *
   * @param token - The token to be used to authenticate user
   * @param sheetId - The id of the exercise sheet to fetch the available exercises
   * @returns - The Available exercises for a giver exercises sheet
   */
  async exercisesSheetGetAvailableToAdd(
    token: string,
    sheetId: string
  ): Promise<IApiAcadExercisesSheetGetAvailableToAddResponse> {
    const requestParams: IApiClientRequestParams = {
      headers: this.#getAuthHeader(token),
      method: HttpMethodEnum.GET,
    };
    const response = this.#api.request(
      `/exercisesSheet/available/${sheetId}`,
      requestParams
    );
    const responseData = await response.promise;
    const availableExercisesToAdd = {
      sheetId,
      availableExercises: responseData.data,
    } as IApiAcadExercisesSheetGetAvailableToAddResponse;

    return availableExercisesToAdd;
  }

  /**
   * Fetches the API providing a header token and adding exercises to a given
   * exercises sheet
   *
   * @param token - The token to be used to authenticate user
   * @param sheetId - The id of the exercise sheet to add the exercises
   * @param exercisesIds - A Array containing the ids of the exercises to be added
   */
  async exercisesSheetAddExercises(
    token: string,
    sheetId: string,
    exercisesIds: number[]
  ): Promise<void> {
    const requestParams: IApiClientRequestParams = {
      headers: this.#getAuthHeader(token),
      body: {
        exercisesIds,
      },
      method: HttpMethodEnum.POST,
    };
    const response = this.#api.request(
      `/exercisesSheet/add/${sheetId}`,
      requestParams
    );

    await response.promise;
  }
}
