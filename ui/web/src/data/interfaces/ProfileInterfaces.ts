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
 * User weekly histogram data
 */
export interface IUserWeeklyHistogramElementData {
  date: string;
  dailyPoints: number;
}
