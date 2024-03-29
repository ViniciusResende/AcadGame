/**
 * @category Manager
 * @module UserManager
 */

/** Enums */
import { UserGetDataTypeEnum } from '../../data/enums/UserEnums';

/** Interfaces */
import { IUserInfoUpdateBody } from '../../data/interfaces/UserInterfaces';
import {
  IApiUserGetDataInfoResponse,
  IApiUserGetDataWeeklyHistogramResponse,
} from '../../resource/api/acad/ApiAcadInterfaces';

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

  async updateInfo(
    userUpdateInfoBody: IUserInfoUpdateBody
  ): Promise<IApiUserGetDataInfoResponse | null> {
    const userUpdatedInfoResponse = (await this.#userEngine.updateDataFromUser(
      UserGetDataTypeEnum.USERINFO,
      userUpdateInfoBody
    )) as IApiUserGetDataInfoResponse;

    return userUpdatedInfoResponse;
  }

  async getWeeklyHistogram(): Promise<IApiUserGetDataWeeklyHistogramResponse | null> {
    const userGetWeeklyHistogramResponse =
      (await this.#userEngine.getDataFromUser(
        UserGetDataTypeEnum.HISTOGRAM,
        null
      )) as IApiUserGetDataWeeklyHistogramResponse;

    return userGetWeeklyHistogramResponse;
  }
}
