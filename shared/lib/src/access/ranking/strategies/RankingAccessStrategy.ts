/**
 * @category Access
 * @module RankingAccess
 */

/** Utilities */
import { Utilities } from '../../../utils/Utilities';

/** Classes */
import { ApiAcad } from '../../../resource/api/acad/ApiAcad';

/** Interfaces */
import { IApiAcadRankingGetWeeklyRankingResponse } from '../../../resource/api/acad/ApiAcadInterfaces';

/**
 * Class that enables the creation of custom Ranking access strategies
 */
export class RankingAccessStrategy {
  #apiAcad: ApiAcad;

  constructor() {
    this.#apiAcad = this.#getApiAcadInstance();
    this.#addEventListeners();
  }

  /**
   * Adds the event listener for configuration changes.
   */
  #addEventListeners() {
    const onConfigurationChanged = this.#onConfigurationChanged.bind(this);
    Utilities.subscribe(
      Utilities.EVENTS.CONFIGURATION_CHANGED,
      onConfigurationChanged
    );
  }

  /**
   * Returns a new ApiAcad instance with the current configuration from Utilities.
   *
   * @returns The ApiAcad instance with updated configuration
   */
  #getApiAcadInstance(): ApiAcad {
    const { baseApiUrl } = Utilities.configuration;
    const apiAcad = new ApiAcad(baseApiUrl || '');
    return apiAcad;
  }

  /**
   * Event handler to deal with configuration changes.
   * It will update the strategy's ApiAcad instance with the new configuration.
   */
  #onConfigurationChanged() {
    this.#apiAcad = this.#getApiAcadInstance();
  }

  /**
   * Retrieves a payload containing all the user exercises sheets with its
   * respective exercises
   *
   * @param token - The token to be used to authenticate user
   * @returns - Array containing all user exercises sheets
   */
  async getWeeklyRanking(
    token: string
  ): Promise<IApiAcadRankingGetWeeklyRankingResponse> {
    const getWeeklyRankingResponse = await this.api.rankingGetWeeklyRanking(
      token
    );

    return getWeeklyRankingResponse;
  }

  /**
   * Getter for the API to be used for getting and saving user data.
   *
   * @returns The API class instance
   */
  get api(): ApiAcad {
    return this.#apiAcad;
  }
}
