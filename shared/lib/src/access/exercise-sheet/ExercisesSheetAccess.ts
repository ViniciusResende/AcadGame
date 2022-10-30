/**
 * @category Access
 * @module ExercisesSheetAccess
 */

/** Classes */
import { ExercisesSheetAccessStrategy } from './strategies/ExercisesSheetAccessStrategy';

/** Interfaces */
import {
  IApiAcadExercisesSheetGetAvailableToAddResponse,
  IApiAcadExercisesSheetGetUserSheetResponse,
} from '../../resource/api/acad/ApiAcadInterfaces';

/**
 * Class to provide access to exchanges' data.
 */
export class ExercisesSheetAccess {
  #accessStrategy: ExercisesSheetAccessStrategy;

  constructor() {
    this.#accessStrategy = new ExercisesSheetAccessStrategy();
  }

  async getUserSheets(
    token: string
  ): Promise<IApiAcadExercisesSheetGetUserSheetResponse[]> {
    const getUserSheetsResponse = await this.#accessStrategy.getUserSheets(
      token
    );

    return getUserSheetsResponse;
  }

  /**
   * Retrieves an payload containing all available exercises to be add to a given
   * exercise sheet and it's Id.
   *
   * @param authToken - An JWT like token that will be used to authenticate while
   * fetching user data
   * @param sheetId - The sheet id that intends to fetch available exercises to add
   * @returns The response payload containing the fetched data
   */
  async getAvailableExercisesToAdd(
    authToken: string,
    sheetId: string
  ): Promise<IApiAcadExercisesSheetGetAvailableToAddResponse> {
    const exerciseSheetGetAvailableExercisesToAddResponseBody =
      await this.#accessStrategy.getAvailableExercisesToAdd(authToken, sheetId);

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
}
