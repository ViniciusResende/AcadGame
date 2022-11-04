/** React imports */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/** React Component */
import ExerciseCard from '../ExerciseCard';
import ExerciseUpdateModal from '../ExerciseUpdateModal';

/** Helpers */
import { getCurrentDate } from '../../../../../helpers';

/** Interfaces */
import {
  IExercisesSheetInfoData,
  ISheetExerciseInfoData,
} from '../../../../../data/interfaces/ExercisesSheetInterfaces';

/** Styles */
import './ExercisesSheet.scss';

/** Assets */
import { CalendarIcon, ToDoListIcon } from '../../../../../assets/svg/icons';

type ExercisesSheetComponentProps = {
  userExercisesSheet: IExercisesSheetInfoData;
  openExerciseEdition: (
    event: React.MouseEvent<HTMLElement>,
    exerciseToBeEdited: ISheetExerciseInfoData,
    sheetBeingEditedId: string
  ) => void;
  addExerciseToSubmit: (exercise: ISheetExerciseInfoData) => void;
  removeExerciseToSubmit: (exerciseId: number) => void;
};

function ExercisesSheetComponent({
  userExercisesSheet,
  openExerciseEdition,
  addExerciseToSubmit,
  removeExerciseToSubmit,
}: ExercisesSheetComponentProps) {
  function exerciseCardOpenEdition(
    event: React.MouseEvent<HTMLElement>,
    exerciseToBeEdited: ISheetExerciseInfoData
  ) {
    openExerciseEdition(event, exerciseToBeEdited, userExercisesSheet.sheetId);
  }

  return (
    <div className="exercises-sheet__container">
      <header className="exercises-sheet__header">
        <div>
          <ToDoListIcon />
          <h3>Sua Ficha - {userExercisesSheet.sheetId}</h3>
        </div>
        <div>
          <CalendarIcon />
          <span>{getCurrentDate()}</span>
        </div>
      </header>
      <main className="exercises-sheet__cards">
        {userExercisesSheet.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.exerciseId}
            userExercise={exercise}
            openExerciseEdition={exerciseCardOpenEdition}
            onCardCheck={() => addExerciseToSubmit(exercise)}
            onCardUncheck={() => removeExerciseToSubmit(exercise.exerciseId)}
          />
        ))}
        <Link
          to={`/exercisesSheets/${userExercisesSheet.sheetId}/add`}
          className="exercises-sheet__add-card"
        >
          Adicionar Exercício +
        </Link>
      </main>
    </div>
  );
}

/** Exports */
export default ExercisesSheetComponent;
