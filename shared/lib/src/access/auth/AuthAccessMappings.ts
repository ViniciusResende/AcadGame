/**
 * @category Access
 * @module AuthAccess
 */

/** Enums */
import { AuthTypeEnum } from '../../data/enums/AuthEnums';

/** Classes */
import { AuthAccessStrategy } from './strategies/AuthAccessStrategy';
import { AuthAccessStrategyLogin } from './strategies/AuthAccessStrategyLogin';
import { AuthAccessStrategySignUp } from './strategies/AuthAccessStrategySignUp';

/**
 * Mapping between NFT type and access strategy class.
 */
export const authTypeStrategyMap = new Map<AuthTypeEnum, AuthAccessStrategy>([
  [AuthTypeEnum.LOGIN, new AuthAccessStrategyLogin()],
  [AuthTypeEnum.SIGNUP, new AuthAccessStrategySignUp()],
]);
