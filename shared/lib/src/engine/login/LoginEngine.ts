/**
 * @category Engine
 * @module LoginEngine
 */

/** Utilities */
import { Utilities } from '../../utils/Utilities';

/** Access */
import { LoginAccess } from '../../access/login/LoginAccess';

/**
 * Class to provide business operations related to login.
 */
export class LoginEngine {
  #loginAccess: LoginAccess;

  constructor() {
    this.#loginAccess = new LoginAccess();
  }
}
