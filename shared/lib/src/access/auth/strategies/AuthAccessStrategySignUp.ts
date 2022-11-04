/**
 * @category Access
 * @module AuthAccess
 */

/** Interfaces */
import {
  IApiAcadAuthResponse,
  IApiAcadSignUpBody,
} from '../../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { AuthAccessStrategy } from './AuthAccessStrategy';

/**
 * Class that specifies SignUp Auth access strategy
 */
export class AuthAccessStrategySignUp extends AuthAccessStrategy {
  async auth(authBody: IApiAcadSignUpBody): Promise<IApiAcadAuthResponse> {
    const { nickname, email, password } = authBody;
    const authResponse = await this.api.signUp(nickname, email, password);

    return authResponse;
  }
}
