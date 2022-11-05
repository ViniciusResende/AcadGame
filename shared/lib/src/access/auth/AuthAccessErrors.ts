/**
 * @category Access
 * @module AuthAccess
 */

/** Enums */
import { AuthTypeEnum } from '../../data/enums/AuthEnums';

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to Auth access.
 */
export class AuthAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthAccessError';
  }
}

/**
 * Class which extends the base AuthAccessError and represents an error that is
 * thrown when no mapping strategy was found for the given Auth type.
 */
export class MissingAuthTypeStrategyError extends AuthAccessError {
  constructor(authType: AuthTypeEnum) {
    super(`No mapping strategy found for Auth of type: '${authType}'`);
    this.name = 'MissingAuthTypeStrategyError';
  }
}
