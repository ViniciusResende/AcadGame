/**
 * @category Manager
 * @module ExercisesSheetManager
 */

/** Interfaces */
import { IExerciseToAddInfo } from '../../data/interfaces/ExercisesSheetInterfaces';
import { IApiAcadExercisesSheetGetUserSheetResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Utilities */
import { Utilities } from '../../utils/Utilities';

/** Engines */
import { ExercisesSheetEngine } from '../../engine/exercises-sheet/ExercisesSheetEngine';

/**
 * Class to handle business logic related to the user data fetching at any level
 * at the application
 */
export class ExercisesSheetManager extends Utilities.pubSub {
  #exercisesSheetEngine: ExercisesSheetEngine;

  constructor() {
    super();
    this.#exercisesSheetEngine = new ExercisesSheetEngine();
  }

  async getUserExercisesSheets(): Promise<
    IApiAcadExercisesSheetGetUserSheetResponse[] | null
  > {
    const exercisesSheetUserSheetsPayload =
      await this.#exercisesSheetEngine.getUserSheets();

    return exercisesSheetUserSheetsPayload;
  }

  async getAllExercisesAvailableForSheet(
    sheetId: string
  ): Promise<IExerciseToAddInfo[] | null> {
    const exercisesSheetGetAvailableForSheetResponse =
      await this.#exercisesSheetEngine.getAvailableExercisesToAdd(sheetId);

    return exercisesSheetGetAvailableForSheetResponse
      ? exercisesSheetGetAvailableForSheetResponse.availableExercises
      : null;
  }
  async addExercisesToSheet(sheetId: string, exercisesIds: number[]) {
    await this.#exercisesSheetEngine.addExercisesToSheet(sheetId, exercisesIds);
  }

  // async updateExerciseOnSheet() {}
}