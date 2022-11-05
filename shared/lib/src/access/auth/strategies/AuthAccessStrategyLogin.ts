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
 * Class that specifies Login Auth access strategy
 */
export class AuthAccessStrategyLogin extends AuthAccessStrategy {
  async auth(authBody: IApiAcadLoginBody): Promise<IApiAcadAuthResponse> {
    const { username, password } = authBody;
    const authResponse = await this.api.login(username, password);

    return authResponse;
  }
}
