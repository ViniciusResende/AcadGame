/** React imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** React Component */
import Checkbox from '../../../../Common/Checkbox';

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
};

function ExerciseCardComponent({
  userExercise,
  openExerciseEdition,
}: ExerciseCardComponentProps) {
  const [isCardActive, setIsCardActive] = useState(false);

  function toggleCardActiveness(_event: React.MouseEvent<HTMLElement>) {
    // event.stopPropagation(); //TODO Prevent multiple calls on checkbox click
    setIsCardActive((prev) => !prev);
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

  return (
    <div
      className={cx('exercise-card__container', { active: isCardActive })}
      onClick={toggleCardActiveness}
    >
      <header className="exercise-card__header">
        <h3>{userExercise.name}</h3>
        <button onClick={(event) => openExerciseEdition(event, userExercise)}>
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
          <Checkbox
            color="system"
            checked={isCardActive}
            onClick={toggleCardActiveness}
            readOnly
          />
        </aside>
      </main>
    </div>
  );
}

/** Exports */
export default ExerciseCardComponent;
