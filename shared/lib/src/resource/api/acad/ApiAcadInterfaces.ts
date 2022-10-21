/**
 * @category API
 * @module ApiAcad
 */

/**
 * API data representation for general HTTP responses' structure.
 */
export interface IApiAcadResponseData {
  code: number;
  data: unknown;
}

/**
 * API data representation for general Auth responses'.
 */
export interface IApiAcadAuthResponse {
  message: string;
  token: string | null;
}

/**
 * API data representation for general User Get Data responses'.
 */
export interface IApiUserGetDataResponse {
  id: string;
  data: unknown;
}

/**
 * API data representation for User Get Data Info responses'.
 */
export interface IApiUserGetDataInfoResponse extends IApiUserGetDataResponse {
  data: {
    nickname: string;
    totalPoints: number;
    profileIcon: string; //TODO change to available pictures enum
  };
}

/**
 * API login Auth body.
 */
export interface IApiAcadLoginBody {
  username: string;
  password: string;
}

/**
 * API signUp Auth body.
 */
export interface IApiAcadSignUpBody {
  nickname: string;
  email: string;
  password: string;
}
