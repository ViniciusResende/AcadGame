/**
 * @category API
 * @module ApiAcad
 */

/** Enums */
import { UserProfilePictureEnum } from '../../../data/enums/UserEnums';

/** Interfaces */
import {
  IExerciseToAddInfo,
  ISheetExerciseInfo,
} from '../../../data/interfaces/ExercisesSheetInterfaces';
import {
  IRankingCurrentUserInfo,
  IRankingUserInfo,
} from '../../../data/interfaces/RankingInterfaces';

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
  id: string | undefined;
  data: unknown;
}

/**
 * API data representation for User Get Data Info responses'.
 */
export interface IApiUserGetDataInfoResponse extends IApiUserGetDataResponse {
  data: {
    nickname: string;
    score: number;
    profileIcon: UserProfilePictureEnum;
  };
}

/**
 * API data representation for User Get Data Weekly Histogram responses'.
 */
export interface IApiUserGetDataWeeklyHistogramResponse
  extends IApiUserGetDataResponse {
  data: {
    date: string;
    score: number;
  }[];
}

/**
 * API data representation for Get User Exercises Sheets response.
 */
export interface IApiAcadExercisesSheetGetUserSheetResponse {
  sheetId: string;
  exercises: ISheetExerciseInfo[];
}

/**
 * API data representation for Exercises Sheet Get Available To Add response.
 */
export interface IApiAcadExercisesSheetGetAvailableToAddResponse {
  sheetId: string;
  availableExercises: IExerciseToAddInfo[];
}

/**
 * API data representation for Get Current User Ranking response.
 */
export interface IApiAcadRankingGetUserRankInfoResponse {
  firstPlaceRankUser: IRankingUserInfo;
  averageScore: number;
  userRankInfo: IRankingCurrentUserInfo;
}

/**
 * API data representation for Get Weekly Ranking response.
 */
export interface IApiAcadRankingGetWeeklyRankingResponse {
  podiumUsers: IRankingUserInfo[];
  nonPodiumUsers: IRankingUserInfo[];
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

/**
 * API Update User Info  body.
 */
export interface IApiAcadUpdateUserInfoBody {
  nickname: string;
  picture: UserProfilePictureEnum;
}

/**
 * API Update Sheet Exercise  body.
 */
export interface IApiAcadExercisesSheetUpdateExerciseBody {
  sheetId: string;
  updatedExercise: ISheetExerciseInfo;
}
