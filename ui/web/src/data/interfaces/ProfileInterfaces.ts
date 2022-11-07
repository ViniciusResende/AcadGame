/**
 * @category Interface
 * @module ProfileInterfaces
 */

/** Enums */
import { UserProfilePictureEnum } from 'acad-game-lib';

/**
 * User info data
 */
export interface IUserInfoData {
  nickname: string;
  totalPoints: number;
  profileIcon: UserProfilePictureEnum;
}

/**
 * User info update payload body
 */
export interface IUserUpdateInfoBody {
  nickname?: string;
  picture?: UserProfilePictureEnum;
}

/**
 * User weekly histogram data
 */
export interface IUserWeeklyHistogramElementData {
  date: string;
  score: number;
}
