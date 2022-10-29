/** React imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** React Component */
import Button from '../../Common/Button';
import ExerciseAddCard from './elements/ExerciseAddCard';

/** React Template Components */
import DefaultCardBox from '../../Template/DefaultCardBox';

/** Interfaces */
import { IExerciseToAddInfoData } from '../../../data/interfaces/ExercisesSheetInterfaces';

/** Styles */
import './ExercisesAdd.scss';

/** Assets */
import { AddSquareIcon, DumbbellIcon } from '../../../assets/svg/icons';

type ExercisesAddComponentProps = {
  availableExercisesList: IExerciseToAddInfoData[];
  addExercisesToSheet: (exercisesIds: number[]) => Promise<void>;
};

function ExercisesAddComponent({
  availableExercisesList,
  addExercisesToSheet,
}: ExercisesAddComponentProps) {
  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    //@ts-ignore
    const checkboxesNodeList = event.target.exercise as RadioNodeList;

    let addedExercisesIds: number[] = [];
    if (checkboxesNodeList) {
      checkboxesNodeList.forEach((value) => {
        //@ts-ignore
        const { checked: checkboxIsChecked, id: exerciseId } = value;

        if (checkboxIsChecked) addedExercisesIds.push(Number(exerciseId));
      });
    }

    addExercisesToSheet(addedExercisesIds);
  }

  return (
    <div className="exercises-add-page__container">
      <form onSubmit={onSubmitForm}>
        <DefaultCardBox title="Exercícios Disponíveis" icon={<DumbbellIcon />}>
          <div className="exercises-add-page__cards">
            {availableExercisesList.map((exercise) => (
              <ExerciseAddCard key={exercise.exerciseId} exercise={exercise} />
            ))}
          </div>
        </DefaultCardBox>
        <Button
          className="exercises-add-page__submit-button"
          modifier="default"
          icon={<AddSquareIcon />}
          type="submit"
        >
          Adicionar
        </Button>
      </form>
    </div>
  );
}

/** Exports */
export default ExercisesAddComponent;
