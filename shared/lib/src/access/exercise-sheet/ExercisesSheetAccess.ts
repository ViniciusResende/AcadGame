/**
 * @category Access
 * @module ExercisesSheetAccess
 */

/** Classes */
import { ExercisesSheetAccessStrategy } from './strategies/ExercisesSheetAccessStrategy';

/** Enums */
import { ExercisesSheetExerciseToAddTypeEnum } from '../../data/enums/ExercisesSheetEnums';

/** Interfaces */
import {
  IApiAcadExercisesSheetGetAvailableToAddResponse,
  IApiAcadExercisesSheetGetUserSheetResponse,
  IApiAcadExercisesSheetUpdateExerciseBody,
} from '../../resource/api/acad/ApiAcadInterfaces';
import { ISheetExerciseInfo } from '../../data/interfaces/ExercisesSheetInterfaces';

/**
 * Class to provide access to exchanges' data.
 */
export class ExercisesSheetAccess {
  #accessStrategy: ExercisesSheetAccessStrategy;

  constructor() {
    this.#accessStrategy = new ExercisesSheetAccessStrategy();
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
    const getUserSheetsResponse = await this.#accessStrategy.getUserSheets(
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
    const updateUserSheetExerciseResponse =
      await this.#accessStrategy.updateUserSheetExercise(
        token,
        updateExerciseBody
      );

    return updateUserSheetExerciseResponse;
  }

  /**
   * Retrieves an payload containing all available exercises to be add to a given
   * exercise sheet and it's Id.
   *
   * @param authToken - An JWT like token that will be used to authenticate while
   * fetching user data
   * @param sheetId - The sheet id that intends to fetch available exercises to add
   * @param filterType - The type of exercises to filter results (not obligatory)
   * @returns The response payload containing the fetched data
   */
  async getAvailableExercisesToAdd(
    authToken: string,
    sheetId: string,
    filterType: ExercisesSheetExerciseToAddTypeEnum | undefined
  ): Promise<IApiAcadExercisesSheetGetAvailableToAddResponse> {
    const exerciseSheetGetAvailableExercisesToAddResponseBody =
      await this.#accessStrategy.getAvailableExercisesToAdd(
        authToken,
        sheetId,
        filterType
      );

    return exerciseSheetGetAvailableExercisesToAddResponseBody;
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
    await this.#accessStrategy.addExercisesToSheet(
      token,
      sheetId,
      exercisesIds
    );
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
    await this.#accessStrategy.submitSelectedExercises(
      token,
      exercisesToSubmit
    );
  }
}
