/** React imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** React Component */
import Checkbox from '../../../../Common/Checkbox';

/** Interfaces */
import { IExerciseToAddInfoData } from '../../../../../data/interfaces/ExercisesSheetInterfaces';

/** Styles */
import './ExerciseAddCard.scss';

type ExercisesAddCardComponentProps = {
  exercise: IExerciseToAddInfoData;
};

function ExerciseAddCardComponent({
  exercise,
}: ExercisesAddCardComponentProps) {
  const [isCardActive, setIsCardActive] = useState(false);

  function toggleCardActiveness(_event: React.MouseEvent<HTMLElement>) {
    // event.stopPropagation(); //TODO Prevent multiple calls on checkbox click
    setIsCardActive((prev) => !prev);
  }

  return (
    <div
      onClick={toggleCardActiveness}
      className={cx('exercises-add-card__container', { active: isCardActive })}
    >
      <strong className="exercises-add-card__title">{exercise.name}</strong>
      <Checkbox
        id={String(exercise.exerciseId)}
        name="exercise"
        value={exercise.exerciseId}
        color="system"
        checked={isCardActive}
        onClick={toggleCardActiveness}
        readOnly
      />
    </div>
  );
}

/** Exports */
export default ExerciseAddCardComponent;
