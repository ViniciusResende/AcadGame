/**
 * @category Access
 * @module ExercisesSheetAccess
 */

/** Utilities */
import { Utilities } from '../../../utils/Utilities';

/** Enums */
import { ExercisesSheetExerciseToAddTypeEnum } from '../../../data/enums/ExercisesSheetEnums';

/** Interfaces */
import {
  IApiAcadExercisesSheetGetAvailableToAddResponse,
  IApiAcadExercisesSheetGetUserSheetResponse,
  IApiAcadExercisesSheetUpdateExerciseBody,
} from '../../../resource/api/acad/ApiAcadInterfaces';
import { ISheetExerciseInfo } from '../../../data/interfaces/ExercisesSheetInterfaces';

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
   * Retrieves a payload containing all the user exercises sheets with its
   * respective exercises
   *
   * @param token - The token to be used to authenticate user
   * @returns - Array containing all user exercises sheets
   */
  async getUserSheets(
    token: string
  ): Promise<IApiAcadExercisesSheetGetUserSheetResponse[]> {
    const getUserSheetsResponse = await this.api.exercisesSheetGetUserSheets(
      token
    );

    return getUserSheetsResponse;
  }

  /**
   * Responsible for updating a exercise from a certain user sheet to match the
   * provided exercise payload
   *
   * @param token - The token to be used to authenticate user
   * @param updateExerciseBody - A body containing the sheetId of the exercise
   * being updated and a object containing the new values fo the exercise
   * @returns - The payload of the exercise that has been updated with new values
   */
  async updateUserSheetExercise(
    token: string,
    updateExerciseBody: IApiAcadExercisesSheetUpdateExerciseBody
  ): Promise<ISheetExerciseInfo> {
    const { sheetId, updatedExercise } = updateExerciseBody;

    const updatedUserSheetExerciseResponse =
      await this.api.exercisesSheetUpdateExercise(
        token,
        sheetId,
        updatedExercise
      );

    return updatedUserSheetExerciseResponse;
  }

  /**
   * Retrieves an payload containing all available exercises to be add to a given
   * exercise sheet and it's Id.
   *
   * @param token - An JWT like token that will be used to authenticate while
   * fetching user data
   * @param sheetId - The sheet id that intends to fetch available exercises to add
   * @param filterType - The type of exercises to filter results (not obligatory)
   * @returns The response payload containing the fetched data
   */
  async getAvailableExercisesToAdd(
    token: string,
    sheetId: string,
    filterType: ExercisesSheetExerciseToAddTypeEnum | undefined
  ): Promise<IApiAcadExercisesSheetGetAvailableToAddResponse> {
    const getAvailableExercisesToAddResponse =
      await this.api.exercisesSheetGetAvailableToAdd(
        token,
        sheetId,
        filterType
      );

    return getAvailableExercisesToAddResponse;
  }

  /**
   * Add to the given exercises sheet all the exercises that have the ids in the
   * exercisesIds array
   *
   * @param token - The token to be used to authenticate user
   * @param sheetId - The id of the exercise sheet to add the exercises
   * @param exercisesIds - A Array containing the ids of the exercises to be added
   */
  async addExercisesToSheet(
    token: string,
    sheetId: string,
    exercisesIds: number[]
  ): Promise<void> {
    await this.api.exercisesSheetAddExercises(token, sheetId, exercisesIds);
  }

  /**
   * Responsible for submitting a list of exercises that the user has marked as
   * concluded at that submit.
   *
   * @param token - The token to be used to authenticate user
   * @param exercisesToSubmit - A exercise array containing all exercises that the
   * user has marked as done
   */
  async submitSelectedExercises(
    token: string,
    exercisesToSubmit: ISheetExerciseInfo[]
  ): Promise<void> {
    await this.api.exercisesSheetSubmitSelectedExercises(
      token,
      exercisesToSubmit
    );
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
