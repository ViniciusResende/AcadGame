/**
 * @category Interface
 * @module ExercisesSheetInterface
 */

/** Enums */
import { ExercisesSheetExerciseToAddTypeEnum } from '../enums/ExercisesSheetEnums';

/**
 * Update Exercise To Add Info body interface.
 */
export interface IExerciseToAddInfo {
  exerciseId: number;
  name: string;
  type: ExercisesSheetExerciseToAddTypeEnum;
}

/**
 * Sheet Exercise Info body interface.
 */
export interface ISheetExerciseInfo {
  exerciseId: number;
  name: string;
  load: number | null;
  time: number | null;
  numRepetitions: number | null;
  numSets: number;
  isLoad: boolean;
}
