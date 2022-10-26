/**
 * @category Access
 * @module UserAccess
 */

/** Interfaces */
import {
  IApiUserGetDataResponse,
  IApiUserGetDataWeeklyHistogramResponse,
} from '../../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { UserAccessStrategy } from './UserAccessStrategy';

/**
 * Class that specifies User Get Data access strategy
 */
export class UserAccessStrategyWeeklyHistogram extends UserAccessStrategy {
  #userWeeklyHistogramCache: IApiUserGetDataWeeklyHistogramResponse | null;

  constructor() {
    super();
    this.#userWeeklyHistogramCache = null;
  }

  async getData(
    token: string
  ): Promise<IApiUserGetDataWeeklyHistogramResponse> {
    if (this.#userWeeklyHistogramCache) return this.#userWeeklyHistogramCache;

    const getUserWeeklyHistogramResponse = await this.api.userWeeklyHistogram(
      token
    );

    this.#userWeeklyHistogramCache = getUserWeeklyHistogramResponse;

    return getUserWeeklyHistogramResponse;
  }

  async updateData(
    token: string,
    _updateDataBody: unknown
  ): Promise<IApiUserGetDataResponse> {
    if (this.#userWeeklyHistogramCache) return this.#userWeeklyHistogramCache;

    const getUserWeeklyHistogramResponse = await this.api.userWeeklyHistogram(
      token
    );

    this.#userWeeklyHistogramCache = getUserWeeklyHistogramResponse;

    return getUserWeeklyHistogramResponse;
  }
}
