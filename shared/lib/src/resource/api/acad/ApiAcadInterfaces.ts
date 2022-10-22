/**
 * @category API
 * @module ApiAcad
 */

/** Enums */
import { UserProfilePictureEnum } from '../../../data/enums/UserEnums';

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
    profileIcon: UserProfilePictureEnum;
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
