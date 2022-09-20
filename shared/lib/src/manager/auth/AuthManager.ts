/**
 * @category Manager
 * @module AuthManager
 */

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
}
