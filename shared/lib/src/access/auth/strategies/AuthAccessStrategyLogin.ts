/**
 * @category Access
 * @module AuthAccess
 */

/** Interfaces */
import {
  IApiAcadAuthResponse,
  IApiAcadLoginBody,
} from '../../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { AuthAccessStrategy } from './AuthAccessStrategy';

/**
 * Class that enables the creation of custom Auth access strategies for various
 * Auth types.
 */
export class AuthAccessStrategyLogin extends AuthAccessStrategy {
  async auth(authBody: IApiAcadLoginBody): Promise<IApiAcadAuthResponse> {
    const { username, password } = authBody;
    const authResponse = await this.api.login(username, password);

    return authResponse;
  }
}
