/**
 * @category Access
 * @module UserAccess
 */

/** Interfaces */
import {
  IApiUserGetDataInfoResponse,
  IApiAcadUpdateUserInfoBody,
} from '../../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { UserAccessStrategy } from './UserAccessStrategy';

/**
 * Class that specifies User Get Data access strategy
 */
export class UserAccessStrategyInfo extends UserAccessStrategy {
  #userInfoCache: IApiUserGetDataInfoResponse | null;

  constructor() {
    super();
    this.#userInfoCache = null;
  }

  async getData(token: string): Promise<IApiUserGetDataInfoResponse> {
    if (this.#userInfoCache) return this.#userInfoCache;

    const getUserInfoResponse = await this.api.userInfo(token);

    this.#userInfoCache = getUserInfoResponse;
    return getUserInfoResponse;
  }

  async updateData(
    token: string,
    updateDataBody: IApiAcadUpdateUserInfoBody
  ): Promise<IApiUserGetDataInfoResponse> {
    const { nickname, picture } = updateDataBody;
    const updatedUserInfoResponse = await this.api.updateUserInfo(
      token,
      nickname,
      picture
    );

    this.#userInfoCache = updatedUserInfoResponse;

    return updatedUserInfoResponse;
  }
}
