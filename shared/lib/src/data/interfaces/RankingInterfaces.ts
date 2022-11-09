/**
 * @category Interface
 * @module RankingInterface
 */

/** Enums */
import { UserProfilePictureEnum } from '../enums/UserEnums';

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
