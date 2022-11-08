/** React imports */
import React, { useState, useMemo } from 'react';
import cx from 'classnames';

/** React Components */
import Modal from '../../../../Common/Modal';
import Button from '../../../../Common/Button';

/** Mappings */
import { userGetProfilePictureImageMap } from '../../../../../Mappers/UserProfilePictureMappings';

/** Styles */
import './ProfilePictureEditionModal.scss';

/** Enums */
import { UserProfilePictureEnum } from 'acad-game-lib';

type ProfilePictureEditionModalComponentProps = {
  userCurrentPicture: UserProfilePictureEnum;
  isOpen: boolean;
  saveNewPicture: (newValue: string) => void;
  handleOnClose: () => void;
};
function ProfilePictureEditionModalComponent({
  userCurrentPicture,
  isOpen,
  saveNewPicture,
  handleOnClose,
}: ProfilePictureEditionModalComponentProps) {
  const [currentSelectedPicture, setCurrentSelectedPicture] =
    useState<UserProfilePictureEnum>(userCurrentPicture);

  const profilePicturesArray = useMemo(
    () => Object.values(UserProfilePictureEnum),
    []
  );

  return (
    <Modal
      title="Edição de Ícone"
      isOpen={isOpen}
      handleOnClose={handleOnClose}
    >
      <div className="picture-modal__container">
        {profilePicturesArray.map((pictureCode) => (
          <div
            key={pictureCode}
            className={cx('picture-modal__picture', {
              isSelected: pictureCode === currentSelectedPicture,
            })}
            onClick={() => setCurrentSelectedPicture(pictureCode)}
          >
            <img
              src={userGetProfilePictureImageMap.get(pictureCode)}
              alt="Opção foto de Perfil do Usuário"
            />
          </div>
        ))}
      </div>
      <section className="picture-modal__submit-area">
        <Button
          modifier="outlined"
          onClick={() => {
            handleOnClose();
            setCurrentSelectedPicture(userCurrentPicture);
          }}
        >
          Cancelar
        </Button>
        <Button
          modifier="default"
          onClick={() => {
            saveNewPicture(currentSelectedPicture);
            handleOnClose();
          }}
          disabled={currentSelectedPicture === userCurrentPicture}
        >
          Confirmar
        </Button>
      </section>
    </Modal>
  );
}

/** Exports */
export default ProfilePictureEditionModalComponent;
