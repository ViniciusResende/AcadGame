/**
 * @category Access
 * @module AuthAccess
 */

/** Enums */
import { AuthTypeEnum } from '../../data/enums/AuthEnums';

/** Interfaces */
import { IApiAcadAuthResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Errors */
import { MissingAuthTypeStrategyError } from './AuthAccessErrors';

/** Classes */
import { AuthAccessStrategy } from './strategies/AuthAccessStrategy';

/** Mappings */
import { authTypeStrategyMap } from './AuthAccessMappings';

/**
 * Class to provide access to exchanges' data.
 */
export class AuthAccess {
  /**
   * Returns the access strategy class for the provided Auth type.
   *
   * @param authType - Type of the Auth Method to get strategy for (e.g login)
   * @returns The strategy class instance to be used
   */
  #getStrategy(authType: AuthTypeEnum): AuthAccessStrategy {
    const strategy = authTypeStrategyMap.get(authType);
    if (!strategy) {
      throw new MissingAuthTypeStrategyError(authType);
    }
    return strategy;
  }

  /**
   * Retrieves an Auth Response Payload after authenticating user give an
   * authentication method
   *
   * @param authType - Type of the Auth Method to get strategy for (e.g login)
   * @param authBody - An body object containing the necessary info for authenticate
   * in a given method
   * @returns The payload containing the Auth Response
   */

  async auth(
    authType: AuthTypeEnum,
    authBody: unknown
  ): Promise<IApiAcadAuthResponse> {
    const strategy = this.#getStrategy(authType);
    const authResponseBody = await strategy.auth(authBody);

    return authResponseBody;
  }
}
