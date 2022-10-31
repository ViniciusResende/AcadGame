/**
 * @category Engine
 * @module ExercisesSheetEngine
 */

/** Enums */
import { ExercisesSheetExerciseToAddTypeEnum } from '../../data/enums/ExercisesSheetEnums';
import { HttpResponseCodesEnum } from '../../utils/classes/api-client/ApiClientEnums';

/** Interfaces */
import { ILibGeneralErrorPayload } from '../../data/interfaces/CommonInterfaces';
import { ISheetExerciseInfo } from '../../data/interfaces/ExercisesSheetInterfaces';
import {
  IApiAcadExercisesSheetGetAvailableToAddResponse,
  IApiAcadExercisesSheetGetUserSheetResponse,
  IApiAcadExercisesSheetUpdateExerciseBody,
} from '../../resource/api/acad/ApiAcadInterfaces';

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

  async getUserSheets(): Promise<
    IApiAcadExercisesSheetGetUserSheetResponse[] | null
  > {
    let exercisesSheetUserSheetsPayload:
      | IApiAcadExercisesSheetGetUserSheetResponse[]
      | null = null;
    try {
      const storedAuthToken = Security.getTokenStored();
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      exercisesSheetUserSheetsPayload =
        await this.#exercisesSheetAccess.getUserSheets(storedAuthToken);
    } catch (error) {
      this.#handleExercisesSheetErrors(error);
      console.error(error);
    }
    return exercisesSheetUserSheetsPayload;
  }

  async updateUserSheetExercise(
    updateExerciseBody: IApiAcadExercisesSheetUpdateExerciseBody
  ): Promise<ISheetExerciseInfo | null> {
    let updatedUserSheetExercisePayload: ISheetExerciseInfo | null = null;
    try {
      const storedAuthToken = Security.getTokenStored();
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      updatedUserSheetExercisePayload =
        await this.#exercisesSheetAccess.updateUserSheetExercise(
          storedAuthToken,
          updateExerciseBody
        );
    } catch (error) {
      this.#handleExercisesSheetErrors(error);
      console.error(error);
    }
    return updatedUserSheetExercisePayload;
  }

  async getAvailableExercisesToAdd(
    sheetId: string,
    filterType: ExercisesSheetExerciseToAddTypeEnum | undefined
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
          sheetId,
          filterType
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
