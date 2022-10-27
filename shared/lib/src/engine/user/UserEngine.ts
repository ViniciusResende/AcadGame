/**
 * @category Engine
 * @module UserEngine
 */

/** Enums */
import { UserGetDataTypeEnum } from '../../data/enums/UserEnums';
import { LocalStorageKeysEnum } from '../../utils/classes/local-storage/LocalStorageEnums';

/** Interfaces */
import { IApiUserGetDataResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { LocalStorage } from '../../utils/classes/local-storage/LocalStorage';

/** Access */
import { UserAccess } from '../../access/user/UserAccess';

/**
 * Class to provide business operations related to User data fetching.
 */
export class UserEngine {
  #userAccess: UserAccess;
  #localStorage: LocalStorage;

  constructor() {
    this.#userAccess = new UserAccess();
    this.#localStorage = new LocalStorage();
  }

  #getAuthToken(): string | null {
    return this.#localStorage.getLocalStorageItem(
      LocalStorageKeysEnum.AUTH_TOKEN
    );
  }

  async getDataFromUser(
    userGetDataType: UserGetDataTypeEnum,
    userGetDataBody: unknown
  ): Promise<IApiUserGetDataResponse | null> {
    let userGetDataPayload: IApiUserGetDataResponse | null = null;
    try {
      const storedAuthToken = this.#getAuthToken();
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      userGetDataPayload = await this.#userAccess.getData(
        userGetDataType,
        storedAuthToken,
        userGetDataBody
      );
    } catch (error) {
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
      const storedAuthToken = this.#getAuthToken();
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      userUpdatedDataPayload = await this.#userAccess.updateData(
        userUpdateDataType,
        storedAuthToken,
        userUpdateDataBody
      );
    } catch (error) {
      console.error(error);
    }
    return userUpdatedDataPayload;
  }
}
