/**
 * @category Interface
 * @module ExercisesSheetInterfaces
 */

/**
 * Exercise to add info data
 */
export interface IExerciseToAddInfoData {
  id: number;
  name: string;
  type: string;
}

/**
 * Sheet Exercise info data
 */
export interface ISheetExerciseInfoData {
  exerciseId: number;
  name: string;
  load: number | null;
  time: number | null;
  numRepetitions: number | null;
  numSets: number;
  isLoad: boolean;
}

/**
 * Exercises Sheet info data
 */
export interface IExercisesSheetInfoData {
  sheetId: string;
  exercises: ISheetExerciseInfoData[];
}
