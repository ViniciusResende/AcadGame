/**
 * @category Interface
 * @module ProfileInterfaces
 */

/**
 * User info data
 */
export interface IUserInfoData {
  nickname: string;
  totalPoints: number;
  profileIcon: string;
}

/**
 * User weekly histogram data
 */
export interface IUserWeeklyHistogramElementData {
  date: string;
  dailyPoints: number;
}
