/**
 * @category Manager
 * @module AuthManager
 */

/** Enums */
import { AuthTypeEnum } from '../../data/enums/AuthEnums';

/** Interfaces */
import { IApiAcadAuthResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Utilities */
import { Utilities } from '../../utils/Utilities';

/** Engines */
import { AuthEngine } from '../../engine/auth/AuthEngine';

/**
 * Class to handle business logic related to the authentication at any level
 * at the application
 */
export class AuthManager extends Utilities.pubSub {
  #authEngine: AuthEngine;

  constructor() {
    super();
    this.#authEngine = new AuthEngine();
  }

  async login(
    username: string,
    password: string
  ): Promise<IApiAcadAuthResponse | null> {
    const authResponse = await this.#authEngine.authenticateUser(
      AuthTypeEnum.LOGIN,
      { username, password }
    );

    return authResponse;
  }

  async signUp(
    nickname: string,
    email: string,
    password: string
  ): Promise<IApiAcadAuthResponse | null> {
    const authResponse = await this.#authEngine.authenticateUser(
      AuthTypeEnum.SIGNUP,
      { nickname, email, password }
    );

    return authResponse;
  }
}
