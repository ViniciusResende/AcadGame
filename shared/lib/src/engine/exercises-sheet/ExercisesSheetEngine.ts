/**
 * @category Engine
 * @module ExercisesSheetEngine
 */

/** Enums */
import { HttpResponseCodesEnum } from '../../utils/classes/api-client/ApiClientEnums';

/** Interfaces */
import { ILibGeneralErrorPayload } from '../../data/interfaces/CommonInterfaces';
import { IApiAcadExercisesSheetGetAvailableToAddResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { ApiClientHttpError } from '../../utils/classes/api-client/ApiClientErrors';
import { Security } from '../../utils/classes/security/Security';

/** Access */
import { ExercisesSheetAccess } from '../../access/exercise-sheet/ExercisesSheetAccess';

/**
 * Class to provide business operations related to User data fetching.
 */
export class ExercisesSheetEngine {
  #exercisesSheetAccess: ExercisesSheetAccess;

  constructor() {
    this.#exercisesSheetAccess = new ExercisesSheetAccess();
  }

  #handleExercisesSheetErrors(error: unknown) {
    if (error) {
      const HttpError = error as ApiClientHttpError;
      if (HttpError.statusCode === HttpResponseCodesEnum.UNAUTHORIZED) {
        const generalErrorPayload: ILibGeneralErrorPayload = {
          errorCode: HttpError.statusCode,
          errorMessage: HttpError.message,
        };
        Security.publishApiRequestUnauthorized(generalErrorPayload);
      }
    }
  }

  async getAvailableExercisesToAdd(
    sheetId: string
  ): Promise<IApiAcadExercisesSheetGetAvailableToAddResponse | null> {
    let exercisesSheetAvailableToAddPayload: IApiAcadExercisesSheetGetAvailableToAddResponse | null =
      null;
    try {
      const storedAuthToken = Security.getTokenStored();
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      exercisesSheetAvailableToAddPayload =
        await this.#exercisesSheetAccess.getAvailableExercisesToAdd(
          storedAuthToken,
          sheetId
        );
    } catch (error) {
      this.#handleExercisesSheetErrors(error);
      console.error(error);
    }
    return exercisesSheetAvailableToAddPayload;
  }

  async addExercisesToSheet(
    sheetId: string,
    exercisesIds: number[]
  ): Promise<void> {
    try {
      const storedAuthToken = Security.getTokenStored();
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      await this.#exercisesSheetAccess.addExercisesToSheet(
        storedAuthToken,
        sheetId,
        exercisesIds
      );
    } catch (error) {
      this.#handleExercisesSheetErrors(error);
      console.error(error);
    }
  }
}
