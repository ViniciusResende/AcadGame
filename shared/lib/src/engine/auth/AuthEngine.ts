/**
 * @category Engine
 * @module AuthEngine
 */

/** Enums */
import { AuthTypeEnum } from '../../data/enums/AuthEnums';

/** Interfaces */
import { IApiAcadAuthResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { Security } from '../../utils/classes/security/Security';

/** Access */
import { AuthAccess } from '../../access/auth/AuthAccess';

/**
 * Class to provide business operations related to authentication.
 */
export class AuthEngine {
  #authAccess: AuthAccess;

  constructor() {
    this.#authAccess = new AuthAccess();
  }

  async authenticateUser(
    authType: AuthTypeEnum,
    authBody: unknown
  ): Promise<IApiAcadAuthResponse | null> {
    let authPayload: IApiAcadAuthResponse | null = null;
    try {
      authPayload = await this.#authAccess.auth(authType, authBody);
      if (authPayload.token) Security.setNewAuthToken(authPayload.token);
    } catch (error) {
      console.log(error);
    }
    return authPayload;
  }
}
