/** React imports */
import React from 'react';

/** React Component */
import DefaultCardBox from '../../Common/DefaultCardBox';

/** Styles */
import './Profile.scss';

/** Assets */
import { DefaultProfilePic } from '../../../assets/images/profilePics';
import {
  PencilIcon,
  PersonIcon,
  TrophyStarIcon,
} from '../../../assets/svg/icons';

type ProfileComponentProps = {
  loginAuth?: (username: string, password: string) => Promise<void>;
};
function ProfileComponent({ loginAuth }: ProfileComponentProps) {
  return (
    <div className="profile-page__container">
      <div className="profile-page__upper-cards">
        <DefaultCardBox title="Informações pessoais" icon={<PersonIcon />}>
          <div className="profile-page__user-info">
            <div className="profile-page__user-picture">
              <img src={DefaultProfilePic} alt="Foto de Perfil do Usuário" />
              <button>
                <PencilIcon />
              </button>
            </div>
            <div className="profile-page__user-name-points">
              <div className="profile-page__user-name">
                <span>Apelido do Usuário</span>
                <button>
                  <PencilIcon />
                </button>
              </div>
              <div className="profile-page__user-points">
                <span>Pontos acumulados:</span>
                <strong>9874</strong>
                <TrophyStarIcon />
              </div>
            </div>
          </div>
        </DefaultCardBox>
      </div>
    </div>
  );
}

/** Exports */
export default ProfileComponent;
