/**
 * @category Manager
 * @module ExercisesSheetManager
 */

/** Interfaces */
import { IExerciseToAddInfo } from '../../data/interfaces/ExercisesSheetInterfaces';
import { IApiAcadExercisesSheetGetAvailableToAddResponse } from '../../resource/api/acad/ApiAcadInterfaces';

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

  async getAllExercisesAvailableForSheet(
    sheetId: string
  ): Promise<IExerciseToAddInfo[] | null> {
    const exercisesSheetGetAvailableForSheetResponse =
      (await this.#exercisesSheetEngine.getAvailableExercisesToAdd(
        sheetId
      )) as IApiAcadExercisesSheetGetAvailableToAddResponse;

    return exercisesSheetGetAvailableForSheetResponse
      ? exercisesSheetGetAvailableForSheetResponse.availableExercises
      : null;
  }
  async addExercisesToSheet(sheetId: string, exercisesIds: number[]) {
    await this.#exercisesSheetEngine.addExercisesToSheet(sheetId, exercisesIds);
  }
}
