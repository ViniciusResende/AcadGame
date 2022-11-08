/**
 * @category Manager
 * @module RankingManager
 */

/** Interfaces */
import {
  IApiAcadRankingGetUserRankInfoResponse,
  IApiAcadRankingGetWeeklyRankingResponse,
} from '../../resource/api/acad/ApiAcadInterfaces';

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

  async getUserRanking(): Promise<IApiAcadRankingGetUserRankInfoResponse | null> {
    const userRankingPayload = await this.#rankingEngine.getUserRanking();

    return userRankingPayload;
  }

  async getWeekRankings(): Promise<IApiAcadRankingGetWeeklyRankingResponse | null> {
    const weekRankingPayload = await this.#rankingEngine.getWeeklyRanking();

    return weekRankingPayload;
  }
}
