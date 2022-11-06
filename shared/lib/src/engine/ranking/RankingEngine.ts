/**
 * @category Engine
 * @module RankingEngine
 */

/** Enums */
import { HttpResponseCodesEnum } from '../../utils/classes/api-client/ApiClientEnums';

/** Interfaces */
import { ILibGeneralErrorPayload } from '../../data/interfaces/CommonInterfaces';
import { IApiAcadRankingGetWeeklyRankingResponse } from '../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { ApiClientHttpError } from '../../utils/classes/api-client/ApiClientErrors';
import { Security } from '../../utils/classes/security/Security';

/** Access */
import { RankingAccess } from '../../access/ranking/RankingAccess';

/**
 * Class to provide business operations related to Ranking data fetching.
 */
export class RankingEngine {
  #rankingAccess: RankingAccess;

  constructor() {
    this.#rankingAccess = new RankingAccess();
  }

  #handleRankingErrors(error: unknown) {
    if (error) {
      const HttpError = error as ApiClientHttpError;
      if (HttpError.statusCode === HttpResponseCodesEnum.UNAUTHORIZED) {
        const generalErrorPayload: ILibGeneralErrorPayload = {
          errorCode: HttpError.statusCode,
          errorMessage: HttpError.message,
        };
        Security.publishApiRequestUnauthorized(generalErrorPayload);
      }
    }
  }

  async getWeeklyRanking(): Promise<IApiAcadRankingGetWeeklyRankingResponse | null> {
    let rankingUserSheetsPayload: IApiAcadRankingGetWeeklyRankingResponse | null =
      null;
    try {
      const storedAuthToken = Security.getTokenStored();
      if (!storedAuthToken)
        throw new Error(`No token stored, unable to authenticate.`);

      rankingUserSheetsPayload = await this.#rankingAccess.getWeeklyRanking(
        storedAuthToken
      );
    } catch (error) {
      this.#handleRankingErrors(error);
      console.error(error);
    }
    return rankingUserSheetsPayload;
  }
}
