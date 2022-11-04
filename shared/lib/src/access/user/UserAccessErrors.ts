/**
 * @category Access
 * @module UserAccess
 */

/** Enums */
import { UserGetDataTypeEnum } from '../../data/enums/UserEnums';

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to User access.
 */
export class UserAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserAccessError';
  }
}

/**
 * Class which extends the base UserAccessError and represents an error that is
 * thrown when no mapping strategy was found for the given User Get Data type.
 */
export class MissingUserGetDataTypeStrategyError extends UserAccessError {
  constructor(getDataType: UserGetDataTypeEnum) {
    super(
      `No mapping strategy found for User Get Data of type: '${getDataType}'`
    );
    this.name = 'MissingUserGetDataTypeStrategyError';
  }
}
