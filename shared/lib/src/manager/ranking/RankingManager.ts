/**
 * @category Manager
 * @module RankingManager
 */

/** Interfaces */
import { IApiAcadRankingGetWeeklyRankingResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Utilities */
import { Utilities } from '../../utils/Utilities';

/** Engines */
import { RankingEngine } from '../../engine/ranking/RankingEngine';

/**
 * Class to handle business logic related to the ranking data fetching at any level
 * at the application
 */
export class RankingManager extends Utilities.pubSub {
  #rankingEngine: RankingEngine;

  constructor() {
    super();
    this.#rankingEngine = new RankingEngine();
  }

  async getWeekRankings(): Promise<IApiAcadRankingGetWeeklyRankingResponse | null> {
    const rankingUserSheetsPayload =
      await this.#rankingEngine.getWeeklyRanking();

    return rankingUserSheetsPayload;
  }
}
