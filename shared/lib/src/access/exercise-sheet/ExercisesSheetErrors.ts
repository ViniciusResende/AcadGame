/**
 * @category Access
 * @module ExercisesSheetAccess
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to ExercisesSheet access.
 */
export class ExercisesSheetAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExercisesSheetAccessError';
  }
}
