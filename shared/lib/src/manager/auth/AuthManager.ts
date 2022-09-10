/**
 * @category Manager
 * @module AuthManager
 */

/** Utilities */
import { Utilities } from '../../utils/Utilities';

/** Engines */
import { LoginEngine } from '../../engine/login/LoginEngine';

/**
 * Class to handle business logic related to the authentication at any level
 * at the application
 */
export class AuthManager extends Utilities.pubSub {
  #loginEngine: LoginEngine;

  constructor() {
    super();

    this.#loginEngine = new LoginEngine();
  }
}
