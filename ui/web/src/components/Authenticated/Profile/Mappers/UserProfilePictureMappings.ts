/** Enums */
import { UserProfilePictureEnum } from 'acad-game-lib';

/** Assets */
import { DefaultProfilePic } from '../../../../assets/images/profilePics';

/**
 * Mapping between User Get profile picture enum and profile picture file.
 */
export const userGetProfilePictureImageMap = new Map<
  UserProfilePictureEnum,
  string
>([[UserProfilePictureEnum.DEFAULT, DefaultProfilePic]]);
