/**
 * Library that provides access to utilities and business rules' managers
 * required for building user interfaces for Evolution Labs.
 * @packageDocumentation
 * @category Library
 * @module AcadGameLib
 */

/** Managers */
import { AuthManager } from './manager/auth/AuthManager';
import { UserManager } from './manager/user/UserManager';

/** Utilities */
import { Utilities, UtilitiesClass } from './utils/Utilities';

/**
 * Class that provides access to utilities and business rules' managers for
 * dealing with assets, auctions, NFTs and transactions.
 */
export class AcadGameLib {
  auth: AuthManager;
  user: UserManager;
  utils: UtilitiesClass;

  constructor() {
    this.auth = new AuthManager();
    this.user = new UserManager();
    this.utils = Utilities;
  }
}
