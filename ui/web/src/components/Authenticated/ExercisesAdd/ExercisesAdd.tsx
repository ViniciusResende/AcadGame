/** React imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** React Component */
import Button from '../../Common/Button';
import ExerciseAddCard from './elements/ExerciseAddCard';

/** React Template Components */
import DefaultCardBox from '../../Template/DefaultCardBox';

/** Library */
import { ExercisesSheetExerciseToAddTypeEnum } from 'acad-game-lib';

/** Interfaces */
import { IExerciseToAddInfoData } from '../../../data/interfaces/ExercisesSheetInterfaces';

/** Styles */
import './ExercisesAdd.scss';

/** Assets */
import { AddSquareIcon, DumbbellIcon } from '../../../assets/svg/icons';

/** Constants */
const availableExercisesFilters = [
  {
    name: 'Dorsais',
    value: ExercisesSheetExerciseToAddTypeEnum.LATS,
  },
  {
    name: 'Bíceps',
    value: ExercisesSheetExerciseToAddTypeEnum.BICEPS,
  },
  {
    name: 'Tríceps',
    value: ExercisesSheetExerciseToAddTypeEnum.TRICEPS,
  },
  {
    name: 'Peito',
    value: ExercisesSheetExerciseToAddTypeEnum.CHEST,
  },
  {
    name: 'Ombro',
    value: ExercisesSheetExerciseToAddTypeEnum.SHOULDER,
  },
  {
    name: 'Quadríceps',
    value: ExercisesSheetExerciseToAddTypeEnum.QUADRICEPS,
  },
  {
    name: 'Posterior-Coxa',
    value: ExercisesSheetExerciseToAddTypeEnum.POSTERIOR_THIGH,
  },
  {
    name: 'Glúteo',
    value: ExercisesSheetExerciseToAddTypeEnum.GLUTEAL,
  },
  {
    name: 'Panturrilha',
    value: ExercisesSheetExerciseToAddTypeEnum.CALF,
  },
];

type ExercisesAddComponentProps = {
  availableExercisesList: IExerciseToAddInfoData[];
  filterExercisesBy: (
    filterType: ExercisesSheetExerciseToAddTypeEnum
  ) => Promise<void>;
  addExercisesToSheet: (exercisesIds: number[]) => Promise<void>;
};

function ExercisesAddComponent({
  availableExercisesList,
  filterExercisesBy,
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
          <ul className="exercises-add-page__filters">
            {availableExercisesFilters.map((filter) => (
              <li
                className="exercises-add-page__filter-option"
                key={filter.value}
                onClick={() => filterExercisesBy(filter.value)}
              >
                {filter.name}
              </li>
            ))}
          </ul>
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
