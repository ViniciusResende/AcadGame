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
 * Week Ranking Info body interface.
 */
export interface IWeekRankingInfo {
  podiumUsers: IRankingUserInfo[];
  nonPodiumUsers: IRankingUserInfo[];
}
