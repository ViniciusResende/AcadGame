/**
 * @category Engine
 * @module AuthEngine
 */

/** Utilities */
import { Utilities } from '../../utils/Utilities';

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
}
