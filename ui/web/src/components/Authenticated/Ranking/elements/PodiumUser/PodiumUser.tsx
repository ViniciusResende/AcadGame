/** React imports */
import React from 'react';
import cx from 'classnames';

/** Interfaces */
import { IRankingUserInfo } from '../../../../../data/interfaces/RankingInterfaces';

/** Mappings */
import { userGetProfilePictureImageMap } from '../../../../../Mappers/UserProfilePictureMappings';

/** Styles */
import './PodiumUser.scss';

/** Assets */
import { TrophyStarIcon } from '../../../../../assets/svg/icons';

type PodiumUserComponentProps = {
  podiumUserInfo: IRankingUserInfo;
  position: number;
};
function PodiumUserComponent({
  podiumUserInfo,
  position,
}: PodiumUserComponentProps) {
  return (
    <div className="podium-user__container">
      <img
        className="podium-user__picture"
        src={userGetProfilePictureImageMap.get(podiumUserInfo.profileIcon)}
        alt={`${podiumUserInfo.nickname}-profile-picture`}
      />
      <div className="podium-user__content">
        <span className="podium-user__name">{podiumUserInfo.nickname}</span>
        <span className="podium-user__points">
          {podiumUserInfo.score} pontos
        </span>
      </div>
      <TrophyStarIcon
        className={cx('podium-user__trophy', {
          [`position-${position}`]: position,
        })}
      />
    </div>
  );
}

/** Exports */
export default PodiumUserComponent;
