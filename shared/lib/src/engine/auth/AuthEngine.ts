/**
 * @category Engine
 * @module AuthEngine
 */

/** Enums */
import { AuthTypeEnum } from '../../data/enums/AuthEnums';
import { LocalStorageKeysEnum } from '../../utils/classes/local-storage/LocalStorageEnums';

/** Interfaces */
import { IApiAcadAuthResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { LocalStorage } from '../../utils/classes/local-storage/LocalStorage';

/** Access */
import { AuthAccess } from '../../access/auth/AuthAccess';

/**
 * Class to provide business operations related to authentication.
 */
export class AuthEngine {
  #authAccess: AuthAccess;
  #localStorage: LocalStorage;

  constructor() {
    this.#authAccess = new AuthAccess();
    this.#localStorage = new LocalStorage();
  }

  #persistAuthToken(token: string) {
    this.#localStorage.setLocalStorageItem(
      LocalStorageKeysEnum.AUTH_TOKEN,
      token
    );
  }

  async authenticateUser(
    authType: AuthTypeEnum,
    authBody: unknown
  ): Promise<IApiAcadAuthResponse | null> {
    let authPayload: IApiAcadAuthResponse | null = null;
    try {
      authPayload = await this.#authAccess.auth(authType, authBody);
      if (authPayload.token) {
        this.#persistAuthToken(authPayload.token);
      }
    } catch (error) {
      console.log(error);
    }
    return authPayload;
  }
}
