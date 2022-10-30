/**
 * @category Interface
 * @module ExercisesSheetInterface
 */

/**
 * Update Exercise To Add Info body interface.
 */
export interface IExerciseToAddInfo {
  exerciseId: number;
  name: string;
  type: string; //TODO add to exercises type enum
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
