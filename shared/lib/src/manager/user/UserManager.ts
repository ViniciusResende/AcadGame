/**
 * @category Manager
 * @module UserManager
 */

/** Enums */
import { UserGetDataTypeEnum } from '../../data/enums/UserEnums';

/** Interfaces */
import { IApiUserGetDataInfoResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Utilities */
import { Utilities } from '../../utils/Utilities';

/** Engines */
import { UserEngine } from '../../engine/user/UserEngine';

/**
 * Class to handle business logic related to the user data fetching at any level
 * at the application
 */
export class UserManager extends Utilities.pubSub {
  #userEngine: UserEngine;

  constructor() {
    super();
    this.#userEngine = new UserEngine();
  }

  async getInfo(): Promise<IApiUserGetDataInfoResponse | null> {
    const userGetInfoResponse = (await this.#userEngine.getDataFromUser(
      UserGetDataTypeEnum.USERINFO,
      null
    )) as IApiUserGetDataInfoResponse;

    return userGetInfoResponse;
  }
}
