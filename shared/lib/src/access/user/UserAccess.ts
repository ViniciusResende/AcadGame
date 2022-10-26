/**
 * @category Access
 * @module UserAccess
 */

/** Enums */
import { UserGetDataTypeEnum } from '../../data/enums/UserEnums';

/** Interfaces */
import { IApiUserGetDataResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Errors */
import { MissingUserGetDataTypeStrategyError } from './UserAccessErrors';

/** Classes */
import { UserAccessStrategy } from './strategies/UserAccessStrategy';

/** Mappings */
import { userGetDataTypeStrategyMap } from './UserAccessMappings';

/**
 * Class to provide access to exchanges' data.
 */
export class UserAccess {
  /**
   * Returns the access strategy class for the provided User Get data type.
   *
   * @param userGetDataType - Type of the info to get strategy for (e.g user info)
   * @returns The strategy class instance to be used
   */
  #getStrategy(userGetDataType: UserGetDataTypeEnum): UserAccessStrategy {
    const strategy = userGetDataTypeStrategyMap.get(userGetDataType);
    if (!strategy) {
      throw new MissingUserGetDataTypeStrategyError(userGetDataType);
    }
    return strategy;
  }

  /**
   * Retrieves an User Get Data Response Payload after fetching user data given
   * an data request
   *
   * @param userGetDataType - Type of the User Get Data type to get strategy for (e.g user info)
   * @param authToken - An JWT like token that will be used to authenticate while
   * fetching user data
   * @param userGetDataBody - An body object containing the necessary info for fetching
   * data of a given type
   * @returns The payload containing the User Get Data Response
   */
  async getData(
    userGetDataType: UserGetDataTypeEnum,
    authToken: string,
    userGetDataBody: unknown
  ): Promise<IApiUserGetDataResponse> {
    const strategy = this.#getStrategy(userGetDataType);
    const userGetDataResponseBody = await strategy.getData(
      authToken,
      userGetDataBody
    );

    return userGetDataResponseBody;
  }

  /**
   * Updates an User Data according to an giver Payload after updating user data
   * retrieves it with the updated data
   *
   * @param userUpdateDataType - Type of the User Update Data type to get strategy for (e.g user info)
   * @param authToken - An JWT like token that will be used to authenticate while
   * fetching user data
   * @param userUpdateDataBody - An body object containing the info to be updated
   * of a given type
   * @returns The payload containing the User Update Data Response
   */
  async updateData(
    userUpdateDataType: UserGetDataTypeEnum,
    authToken: string,
    userUpdateDataBody: unknown
  ): Promise<IApiUserGetDataResponse> {
    const strategy = this.#getStrategy(userUpdateDataType);
    const userGetDataResponseBody = await strategy.updateData(
      authToken,
      userUpdateDataBody
    );

    return userGetDataResponseBody;
  }
}
