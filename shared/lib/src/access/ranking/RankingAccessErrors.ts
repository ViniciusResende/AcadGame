/**
 * @category Access
 * @module RankingAccess
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to Ranking access.
 */
export class RankingAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RankingAccessError';
  }
}
