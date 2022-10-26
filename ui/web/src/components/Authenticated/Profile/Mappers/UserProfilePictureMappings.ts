/** Enums */
import { UserProfilePictureEnum } from 'acad-game-lib';

/** Assets */
import {
  DefaultProfilePic,
  GenericManOne,
  SpecialBuzz,
} from '../../../../assets/images/profilePics';

/**
 * Mapping between User Get profile picture enum and profile picture file.
 */
export const userGetProfilePictureImageMap = new Map<
  UserProfilePictureEnum,
  string
>([
  [UserProfilePictureEnum.DEFAULT, DefaultProfilePic],
  [UserProfilePictureEnum.GENERIC_MAN_ONE, GenericManOne],
  [UserProfilePictureEnum.SPECIAL_BUZZ, SpecialBuzz],
]);
