/**
 * @category API
 * @module ApiAcad
 */

/**
 * API data representation for general HTTP responses' structure.
 */
export interface IApiAcadResponseData {
  code: number;
  data: unknown;
}

/**
 * API data representation for general Auth responses'.
 */
export interface IApiAcadAuthResponse {
  message: string;
  token: string | null;
}

/**
 * API login Auth body.
 */
export interface IApiAcadLoginBody {
  username: string;
  password: string;
}
