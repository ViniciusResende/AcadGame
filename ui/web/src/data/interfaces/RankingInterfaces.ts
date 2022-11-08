/**
 * @category Interface
 * @module RankingInterfaces
 */

/** Enums */
import { UserProfilePictureEnum } from 'acad-game-lib';

/**
 * Ranking User Info body interface.
 */
export interface IRankingUserInfo {
  userId: string;
  score: number;
  nickname: string;
  profileIcon: UserProfilePictureEnum;
}

/**
 * Ranking Current User Info body interface.
 */
export interface IRankingCurrentUserInfo extends IRankingUserInfo {
  userRank: number;
}

/**
 * User Ranking Info body interface.
 */
export interface IUserRankingInfo {
  firstPlaceRankUser: IRankingUserInfo;
  averageScore: number;
  userRankInfo: IRankingCurrentUserInfo;
}

/**
 * Week Ranking Info body interface.
 */
export interface IWeekRankingInfo {
  podiumUsers: IRankingUserInfo[];
  nonPodiumUsers: IRankingUserInfo[];
}
