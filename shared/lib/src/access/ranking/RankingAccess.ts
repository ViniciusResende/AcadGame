/**
 * @category Access
 * @module RankingAccess
 */

/** Classes */
import { RankingAccessStrategy } from './strategies/RankingAccessStrategy';

/** Interfaces */
import { IApiAcadRankingGetWeeklyRankingResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/**
 * Class to provide access to exchanges' data.
 */
export class RankingAccess {
  #accessStrategy: RankingAccessStrategy;

  constructor() {
    this.#accessStrategy = new RankingAccessStrategy();
  }

  async getWeeklyRanking(
    token: string
  ): Promise<IApiAcadRankingGetWeeklyRankingResponse> {
    const getWeeklyRankingResponse =
      await this.#accessStrategy.getWeeklyRanking(token);

    return getWeeklyRankingResponse;
  }
}
