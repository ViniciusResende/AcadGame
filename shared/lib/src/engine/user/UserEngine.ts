/**
 * @category Engine
 * @module UserEngine
 */

/** Enums */
import { UserGetDataTypeEnum } from '../../data/enums/UserEnums';
import { HttpResponseCodesEnum } from '../../utils/classes/api-client/ApiClientEnums';

/** Interfaces */
import { ILibGeneralErrorPayload } from '../../data/interfaces/CommonInterfaces';
import { IApiUserGetDataResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { ApiClientHttpError } from '../../utils/classes/api-client/ApiClientErrors';
import { Security } from '../../utils/classes/security/Security';

/** Access */
import { UserAccess } from '../../access/user/UserAccess';

/**
 * Class to provide business operations related to User data fetching.
 */
export class UserEngine {
  #userAccess: UserAccess;

  constructor() {
    this.#userAccess = new UserAccess();
  }

  #handleUserErrors(error: unknown) {
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

  async getDataFromUser(
    userGetDataType: UserGetDataTypeEnum,
    userGetDataBody: unknown
  ): Promise<IApiUserGetDataResponse | null> {
    let userGetDataPayload: IApiUserGetDataResponse | null = null;
    try {
      const storedAuthToken = Security.getTokenStored() || 'banana';
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      userGetDataPayload = await this.#userAccess.getData(
        userGetDataType,
        storedAuthToken,
        userGetDataBody
      );
    } catch (error) {
      this.#handleUserErrors(error);
      console.error(error);
    }
    return userGetDataPayload;
  }

  async updateDataFromUser(
    userUpdateDataType: UserGetDataTypeEnum,
    userUpdateDataBody: unknown
  ): Promise<IApiUserGetDataResponse | null> {
    let userUpdatedDataPayload: IApiUserGetDataResponse | null = null;
    try {
      const storedAuthToken = Security.getTokenStored();
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      userUpdatedDataPayload = await this.#userAccess.updateData(
        userUpdateDataType,
        storedAuthToken,
        userUpdateDataBody
      );
    } catch (error) {
      this.#handleUserErrors(error);
      console.error(error);
    }
    return userUpdatedDataPayload;
  }
}
