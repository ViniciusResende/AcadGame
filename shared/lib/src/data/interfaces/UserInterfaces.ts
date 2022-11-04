/**
 * @category Interface
 * @module UserInterfaces
 */

/** Enums */
import { UserProfilePictureEnum } from '../enums/UserEnums';

/**
 * Update User Info body interface.
 */
export interface IUserInfoUpdateBody {
  nickname?: string;
  picture?: UserProfilePictureEnum;
}
