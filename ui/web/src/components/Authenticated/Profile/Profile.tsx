/** React imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** React Component */
import Input from '../../Common/Input';
import ProfilePictureEditionModalComponent from './elements/ProfilePictureEditionModal';
import WorkingOnPlaceholder from '../../Common/WorkingOnPlaceholder';
import WeeklyUserChart from './elements/WeeklyUserChart';

/** React Template Components */
import DefaultCardBox from '../../Template/DefaultCardBox';

/** Mappings */
import { userGetProfilePictureImageMap } from '../../../Mappers/UserProfilePictureMappings';

/** Styles */
import './Profile.scss';

/** Interfaces */
import {
  IUserInfoData,
  IUserUpdateInfoBody,
  IUserWeeklyHistogramElementData,
} from '../../../data/interfaces/ProfileInterfaces';

/** Enums */
import { UserProfilePictureEnum } from 'acad-game-lib';

/** Assets */
import {
  BullseyeArrowIcon,
  CheckIcon,
  MetricsChartIcon,
  PencilIcon,
  PersonIcon,
  TrophyStarIcon,
  XMarkIcon,
} from '../../../assets/svg/icons';
import { CellphoneMetricsIllustration } from '../../../assets/svg/illustrations';

enum UserInfoEditType {
  NICKNAME = 'nickname',
  PICTURE = 'picture',
}

type ProfileComponentProps = {
  userInfo: IUserInfoData;
  userWeeklyHistogram: IUserWeeklyHistogramElementData[];
  updateUserInfo: (userUpdateInfoBody: IUserUpdateInfoBody) => Promise<void>;
};
function ProfileComponent({
  userInfo,
  userWeeklyHistogram,
  updateUserInfo,
}: ProfileComponentProps) {
  const [isInNicknameEditionMode, setIsInNicknameEditionMode] = useState(false);
  const [nicknameInputValue, setNicknameInputValue] = useState('');
  const [
    isProfilePictureEditionModalOpen,
    setIsProfilePictureEditionModalOpen,
  ] = useState(false);

  async function handleEditUserInfo(type: UserInfoEditType, newValue: string) {
    const updatePayload = (() => {
      if (type === UserInfoEditType.NICKNAME) return { nickname: newValue };
      else if (type === UserInfoEditType.PICTURE)
        return { picture: newValue as UserProfilePictureEnum };
      else return userInfo;
    })();

    await updateUserInfo(updatePayload);
  }

  function renderUserNicknameField() {
    return (
      <>
        {isInNicknameEditionMode ? (
          <Input
            controlId="nickname"
            inputLabel="Apelido"
            modifier="clear"
            name="nickname"
            value={nicknameInputValue}
            onChange={(event) =>
              setNicknameInputValue(event.currentTarget.value)
            }
          />
        ) : (
          <span>{userInfo.nickname}</span>
        )}
      </>
    );
  }

  function renderUserNicknameInteractionArea() {
    function renderEditButton() {
      return (
        <button
          onClick={() => setIsInNicknameEditionMode(true)}
          data-cy="edit-name-button"
        >
          <PencilIcon />
        </button>
      );
    }

    function renderConfirmEditButtons() {
      return (
        <>
          <button
            onClick={() => {
              handleEditUserInfo(UserInfoEditType.NICKNAME, nicknameInputValue);
              setIsInNicknameEditionMode(false);
              setNicknameInputValue('');
            }}
            data-cy="edit-name-confirm"
          >
            <CheckIcon />
          </button>
          <button
            onClick={() => {
              setIsInNicknameEditionMode(false);
              setNicknameInputValue('');
            }}
            data-cy="edit-name-cancel"
          >
            <XMarkIcon />
          </button>
        </>
      );
    }

    return (
      <>
        {isInNicknameEditionMode ? (
          <>{renderConfirmEditButtons()}</>
        ) : (
          <>{renderEditButton()}</>
        )}
      </>
    );
  }

  return (
    <div className="profile-page__container">
      <ProfilePictureEditionModalComponent
        userCurrentPicture={userInfo.profileIcon}
        isOpen={isProfilePictureEditionModalOpen}
        saveNewPicture={(newValue) =>
          handleEditUserInfo(UserInfoEditType.PICTURE, newValue)
        }
        handleOnClose={() => setIsProfilePictureEditionModalOpen(false)}
      />
      <div className="profile-page__upper-cards">
        <DefaultCardBox title="Informações pessoais" icon={<PersonIcon />}>
          <div className="profile-page__user-info">
            <div className="profile-page__user-picture">
              <img
                src={userGetProfilePictureImageMap.get(userInfo.profileIcon)}
                alt="Foto de Perfil do Usuário"
                data-cy={userInfo.profileIcon}
              />
              <button
                onClick={() => setIsProfilePictureEditionModalOpen(true)}
                data-cy="edit-picture-button"
              >
                <PencilIcon />
              </button>
            </div>
            <div className="profile-page__user-name-points">
              <div
                className={cx('profile-page__user-name', {
                  inEditionMode: isInNicknameEditionMode,
                })}
              >
                {renderUserNicknameField()}
                {renderUserNicknameInteractionArea()}
              </div>
              <div className="profile-page__user-points">
                <span>Pontos acumulados:</span>
                <strong>{userInfo.score}</strong>
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
            <div className="profile-page__user-metrics-illustration">
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
