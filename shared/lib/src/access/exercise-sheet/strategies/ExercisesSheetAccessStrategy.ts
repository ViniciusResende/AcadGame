/**
 * @category Access
 * @module UserAccess
 */

/** Utilities */
import { Utilities } from '../../../utils/Utilities';

/** Interfaces */
import { IApiAcadExercisesSheetGetAvailableToAddResponse } from '../../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { ApiAcad } from '../../../resource/api/acad/ApiAcad';

/**
 * Class that enables the creation of custom User access strategies for various
 * User actions types.
 */
export class ExercisesSheetAccessStrategy {
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
   * Retrieves an payload containing all available exercises to be add to a given
   * exercise sheet and it's Id.
   *
   * @param token - An JWT like token that will be used to authenticate while
   * fetching user data
   * @param sheetId - The sheet id that intends to fetch available exercises to add
   * @returns The response payload containing the fetched data
   */
  async getAvailableExercisesToAdd(
    token: string,
    sheetId: string
  ): Promise<IApiAcadExercisesSheetGetAvailableToAddResponse> {
    const getAvailableExercisesToAddResponse =
      await this.api.exercisesSheetGetAvailableToAdd(token, sheetId);

    return getAvailableExercisesToAddResponse;
  }

  async addExercisesToSheet(
    token: string,
    sheetId: string,
    exercisesIds: number[]
  ): Promise<void> {
    await this.api.exercisesSheetAddExercises(token, sheetId, exercisesIds);
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
