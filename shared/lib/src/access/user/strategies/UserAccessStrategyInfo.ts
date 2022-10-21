/**
 * @category Access
 * @module UserAccess
 */

/** Interfaces */
import { IApiUserGetDataInfoResponse } from '../../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { UserAccessStrategy } from './UserAccessStrategy';

/**
 * Class that specifies Login Auth access strategy
 */
export class UserAccessStrategyInfo extends UserAccessStrategy {
  async getData(token: string): Promise<IApiUserGetDataInfoResponse> {
    const getUserInfoResponse = await this.api.userInfo(token);

    return getUserInfoResponse;
  }
}
