/**
 * @category Access
 * @module UserAccess
 */

/** Enums */
import { UserGetDataTypeEnum } from '../../data/enums/UserEnums';

/** Classes */
import { UserAccessStrategy } from './strategies/UserAccessStrategy';
import { UserAccessStrategyInfo } from './strategies/UserAccessStrategyInfo';
import { UserAccessStrategyWeeklyHistogram } from './strategies/UserAccessStrategyWeeklyHistogram';

/**
 * Mapping between User Get Data type and access strategy class.
 */
export const userGetDataTypeStrategyMap = new Map<
  UserGetDataTypeEnum,
  UserAccessStrategy
>([
  [UserGetDataTypeEnum.USERINFO, new UserAccessStrategyInfo()],
  [UserGetDataTypeEnum.HISTOGRAM, new UserAccessStrategyWeeklyHistogram()],
]);
