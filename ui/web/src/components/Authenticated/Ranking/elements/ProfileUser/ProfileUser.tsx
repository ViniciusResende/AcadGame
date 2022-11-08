/** React imports */
import React from 'react';

/** Interfaces */
import { IRankingCurrentUserInfo } from '../../../../../data/interfaces/RankingInterfaces';

/** Mappings */
import { userGetProfilePictureImageMap } from '../../../../../Mappers/UserProfilePictureMappings';

/** Styles */
import './ProfileUser.scss';

type ProfileUserComponentProps = {
  profileUserInfo: IRankingCurrentUserInfo;
};
function ProfileUserComponent({ profileUserInfo }: ProfileUserComponentProps) {
  return (
    <div className="profile-user__container">
      <img
        className="profile-user__picture"
        src={userGetProfilePictureImageMap.get(profileUserInfo.profileIcon)}
        alt={`${profileUserInfo.nickname}-profile-picture`}
      />
      <div className="profile-user__content">
        <strong className="profile-user__info">
          {profileUserInfo.nickname}
        </strong>
        <span className="profile-user__info">
          Score: <strong>{profileUserInfo.score}</strong>
        </span>
        <span className="profile-user__info">
          Colocação: <strong>{profileUserInfo.userRank}&deg;</strong>
        </span>
      </div>
    </div>
  );
}

/** Exports */
export default ProfileUserComponent;
