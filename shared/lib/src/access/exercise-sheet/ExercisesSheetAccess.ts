/**
 * @category Access
 * @module ExercisesSheetAccess
 */

/** Classes */
import { ExercisesSheetAccessStrategy } from './strategies/ExercisesSheetAccessStrategy';

/** Interfaces */
import { IApiAcadExercisesSheetGetAvailableToAddResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/**
 * Class to provide access to exchanges' data.
 */
export class ExercisesSheetAccess {
  #accessStrategy: ExercisesSheetAccessStrategy;

  constructor() {
    this.#accessStrategy = new ExercisesSheetAccessStrategy();
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
