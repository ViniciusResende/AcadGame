/** React imports */
import React from 'react';

/** React Component */
import WorkingOnPlaceholder from '../../Common/WorkingOnPlaceholder';
import WeeklyUserChart from './elements/WeeklyUserChart';

/** React Template Components */
import DefaultCardBox from '../../Template/DefaultCardBox';

/** Mappings */
import { userGetProfilePictureImageMap } from './Mappers/UserProfilePictureMappings';

/** Styles */
import './Profile.scss';

/** Interfaces */
import {
  IUserInfoData,
  IUserWeeklyHistogramElementData,
} from '../../../data/interfaces/ProfileInterfaces';

/** Assets */
import {
  BullseyeArrowIcon,
  MetricsChartIcon,
  PencilIcon,
  PersonIcon,
  TrophyStarIcon,
} from '../../../assets/svg/icons';
import { CellphoneMetricsIllustration } from '../../../assets/svg/illustrations';

type ProfileComponentProps = {
  userInfo: IUserInfoData;
  userWeeklyHistogram: IUserWeeklyHistogramElementData[];
};
function ProfileComponent({
  userInfo,
  userWeeklyHistogram,
}: ProfileComponentProps) {
  return (
    <div className="profile-page__container">
      <div className="profile-page__upper-cards">
        <DefaultCardBox title="Informações pessoais" icon={<PersonIcon />}>
          <div className="profile-page__user-info">
            <div className="profile-page__user-picture">
              <img
                src={userGetProfilePictureImageMap.get(userInfo.profileIcon)}
                alt="Foto de Perfil do Usuário"
              />
              <button>
                <PencilIcon />
              </button>
            </div>
            <div className="profile-page__user-name-points">
              <div className="profile-page__user-name">
                <span>{userInfo.nickname}</span>
                <button>
                  <PencilIcon />
                </button>
              </div>
              <div className="profile-page__user-points">
                <span>Pontos acumulados:</span>
                <strong>{userInfo.totalPoints}</strong>
                <TrophyStarIcon />
              </div>
            </div>
          </div>
        </DefaultCardBox>
        <DefaultCardBox
          title="Conquistas alcançadas"
          icon={<BullseyeArrowIcon />}
        >
          <>
            <WorkingOnPlaceholder />
          </>
        </DefaultCardBox>
      </div>
      <div className="profile-page__bottom-card">
        <DefaultCardBox title="Métricas da Semana" icon={<MetricsChartIcon />}>
          <div className="profile-page__user-metrics">
            <div>
              <CellphoneMetricsIllustration />
            </div>
            <WeeklyUserChart userWeeklyHistogram={userWeeklyHistogram} />
          </div>
        </DefaultCardBox>
      </div>
    </div>
  );
}

/** Exports */
export default ProfileComponent;
