/**
 * @category Access
 * @module UserAccess
 */

/** Interfaces */
import { IApiUserGetDataWeeklyHistogramResponse } from '../../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { UserAccessStrategy } from './UserAccessStrategy';

/**
 * Class that specifies User Get Data access strategy
 */
export class UserAccessStrategyWeeklyHistogram extends UserAccessStrategy {
  async getData(
    token: string
  ): Promise<IApiUserGetDataWeeklyHistogramResponse> {
    const getUserInfoResponse = await this.api.userWeeklyHistogram(token);

    return getUserInfoResponse;
  }
}
