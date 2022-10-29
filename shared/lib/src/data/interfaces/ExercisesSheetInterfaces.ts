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
