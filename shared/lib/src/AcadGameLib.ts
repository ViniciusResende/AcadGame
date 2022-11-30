/**
 * Library that provides access to utilities and business rules' managers
 * required for building user interfaces for Evolution Labs.
 * @packageDocumentation
 * @category Library
 * @module AcadGameLib
 */

/** Managers */
import { AuthManager } from './manager/auth/AuthManager';
import { ExercisesSheetManager } from './manager/exercise-sheet/ExercisesSheetManager';
import { RankingManager } from './manager/ranking/RankingManager';
import { UserManager } from './manager/user/UserManager';

/** Utilities */
import { Utilities, UtilitiesClass } from './utils/Utilities';

/**
 * Class that provides access to utilities and business rules' managers for
 * dealing with assets, auctions, NFTs and transactions.
 */
export class AcadGameLib {
  auth: AuthManager;
  exercisesSheet: ExercisesSheetManager;
  ranking: RankingManager;
  user: UserManager;
  utils: UtilitiesClass;

  constructor() {
    this.auth = new AuthManager();
    this.exercisesSheet = new ExercisesSheetManager();
    this.ranking = new RankingManager();
    this.user = new UserManager();
    this.utils = Utilities;
  }
}
