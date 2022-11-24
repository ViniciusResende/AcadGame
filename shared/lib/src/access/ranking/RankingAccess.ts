/**
 * @category Access
 * @module RankingAccess
 */

/** Classes */
import { RankingAccessStrategy } from './strategies/RankingAccessStrategy';

/** Interfaces */
import {
  IApiAcadRankingGetUserRankInfoResponse,
  IApiAcadRankingGetWeeklyRankingResponse,
} from '../../resource/api/acad/ApiAcadInterfaces';

/**
 * Class to provide access to exchanges' data.
 */
export class RankingAccess {
  #accessStrategy: RankingAccessStrategy;

  constructor() {
    this.#accessStrategy = new RankingAccessStrategy();
  }

  async getUserRanking(
    token: string
  ): Promise<IApiAcadRankingGetUserRankInfoResponse> {
    const getUserRankingResponse = await this.#accessStrategy.getUserRanking(
      token
    );

    return getUserRankingResponse;
  }

  async getWeeklyRanking(
    token: string
  ): Promise<IApiAcadRankingGetWeeklyRankingResponse> {
    const getWeeklyRankingResponse =
      await this.#accessStrategy.getWeeklyRanking(token);

    return getWeeklyRankingResponse;
  }
}
