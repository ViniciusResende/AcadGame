/** React imports */
import React, { useEffect, useState } from 'react';
import cx from 'classnames';

/** React Component */
import Checkbox from '../../../../Common/Checkbox';

/** Library */
import Lib from 'acad-game-lib';

/** Enums */
import { ExercisesSheetEventTypesEnum } from '../../../../../data/enums/ExercisesSheetEnums';

/** Interfaces */
import { ISheetExerciseInfoData } from '../../../../../data/interfaces/ExercisesSheetInterfaces';

/** Styles */
import './ExerciseCard.scss';

/** Assets */
import { PencilIcon } from '../../../../../assets/svg/icons';

type ExerciseCardComponentProps = {
  userExercise: ISheetExerciseInfoData;
  openExerciseEdition: (
    event: React.MouseEvent<HTMLElement>,
    exerciseToBeEdited: ISheetExerciseInfoData
  ) => void;
  onCardCheck: () => void;
  onCardUncheck: () => void;
};

function ExerciseCardComponent({
  userExercise,
  openExerciseEdition,
  onCardCheck,
  onCardUncheck,
}: ExerciseCardComponentProps) {
  const [isCardActive, setIsCardActive] = useState(false);

  function activateCard() {
    setIsCardActive(true);
    onCardCheck();
  }

  function deactivateCard() {
    setIsCardActive(false);
    onCardUncheck();
  }

  function toggleCardActiveness(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    isCardActive ? deactivateCard() : activateCard();
  }

  function renderLoadExerciseContent() {
    return (
      <>
        <div className="exercise-card__metric">
          <strong className="exercise-card__metric-title">Séries:</strong>
          <div className="exercise-card__metric-value">
            {userExercise.numSets}
          </div>
        </div>
        <div className="exercise-card__metric">
          <strong className="exercise-card__metric-title">Repetições:</strong>
          <div className="exercise-card__metric-value">
            {userExercise.numRepetitions}
          </div>
        </div>
        <div className="exercise-card__metric">
          <strong className="exercise-card__metric-title">Peso:</strong>
          <div className="exercise-card__metric-label-value">
            <div className="exercise-card__metric-value">
              {userExercise.load}
            </div>
            <strong className="exercise-card__metric-label">kg</strong>
          </div>
        </div>
      </>
    );
  }

  function renderTimeExerciseContent() {
    return (
      <>
        <div className="exercise-card__metric">
          <strong className="exercise-card__metric-title">Séries:</strong>
          <div className="exercise-card__metric-value">
            {userExercise.numSets}
          </div>
        </div>
        <div className="exercise-card__metric">
          <strong className="exercise-card__metric-title">Tempo:</strong>
          <div className="exercise-card__metric-label-value">
            <div className="exercise-card__metric-value">
              {userExercise.time}
            </div>
            <strong className="exercise-card__metric-label">min</strong>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    const cleanCardState = () => setIsCardActive(false);

    Lib.utils.subscribe(
      ExercisesSheetEventTypesEnum.EXERCISES_SHEETS_SUBMITTED,
      cleanCardState
    );

    return () =>
      Lib.utils.unsubscribe(
        ExercisesSheetEventTypesEnum.EXERCISES_SHEETS_SUBMITTED,
        cleanCardState
      );
  }, []);

  return (
    <div
      className={cx('exercise-card__container', { active: isCardActive })}
      onClick={toggleCardActiveness}
    >
      <header className="exercise-card__header">
        <h3>{userExercise.name}</h3>
        <button
          onClick={(event) => openExerciseEdition(event, userExercise)}
          data-cy="exercise-edit-button"
        >
          <PencilIcon />
        </button>
      </header>
      <main className="exercise-card__content">
        <aside className="exercise-card__metrics">
          {userExercise.isLoad
            ? renderLoadExerciseContent()
            : renderTimeExerciseContent()}
        </aside>
        <aside className="exercise-card__checkbox-container">
          <Checkbox color="system" checked={isCardActive} readOnly />
        </aside>
      </main>
    </div>
  );
}

/** Exports */
export default ExerciseCardComponent;
