/** React imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** React Component */
import Button from '../../Common/Button';
import ExercisesSheet from './elements/ExercisesSheet';
import ExerciseUpdateModal from './elements/ExerciseUpdateModal';
import Slider from '../../Common/Slider';

/** React Template Components */
import DefaultCardBox from '../../Template/DefaultCardBox';

/** Interfaces */
import {
  IExercisesSheetInfoData,
  ISheetExerciseInfoData,
} from '../../../data/interfaces/ExercisesSheetInterfaces';

/** Styles */
import './ExercisesSheets.scss';

/** Assets */
import { FlagIcon } from '../../../assets/svg/icons';

type ExercisesSheetsComponentProps = {
  userExercisesSheets: IExercisesSheetInfoData[];
  saveExerciseEdition: (
    sheetId: string,
    updatedExerciseData: ISheetExerciseInfoData
  ) => void;
  addExerciseToSubmit: (exercise: ISheetExerciseInfoData) => void;
  removeExerciseToSubmit: (exerciseId: number) => void;
  submitSelectedExercises: () => void;
};
function ExercisesSheetsComponent({
  userExercisesSheets,
  saveExerciseEdition,
  addExerciseToSubmit,
  removeExerciseToSubmit,
  submitSelectedExercises,
}: ExercisesSheetsComponentProps) {
  const [isEditionModalOpen, setIsEditionModalOpen] = useState(false);
  const [sheetBeingEditedId, setSheetBeingEditedId] = useState('');
  const [exerciseBeingUpdated, setExerciseBeingUpdated] =
    useState<ISheetExerciseInfoData | null>(null);

  function openExerciseEdition(
    event: React.MouseEvent<HTMLElement>,
    exerciseToBeEdited: ISheetExerciseInfoData,
    sheetBeingEditedId: string
  ) {
    event.stopPropagation();
    setExerciseBeingUpdated(exerciseToBeEdited);
    setSheetBeingEditedId(sheetBeingEditedId);
    setIsEditionModalOpen(true);
  }

  function closeExerciseEdition() {
    setIsEditionModalOpen(false);
  }

  return (
    <>
      <ExerciseUpdateModal
        isOpen={isEditionModalOpen}
        handleOnClose={closeExerciseEdition}
        exerciseBeingEdited={exerciseBeingUpdated}
        saveEdition={(updatedExerciseData: ISheetExerciseInfoData) =>
          saveExerciseEdition(sheetBeingEditedId, updatedExerciseData)
        }
      />
      <main className="exercises-sheets-page__container">
        <Slider autoplay={false}>
          {userExercisesSheets.map((exercisesSheet) => (
            <ExercisesSheet
              key={exercisesSheet.sheetId}
              userExercisesSheet={exercisesSheet}
              openExerciseEdition={openExerciseEdition}
              addExerciseToSubmit={addExerciseToSubmit}
              removeExerciseToSubmit={removeExerciseToSubmit}
            />
          ))}
        </Slider>
      </main>
      <footer className="exercises-sheets-page__submit-sheet">
        <Button
          modifier="default"
          icon={<FlagIcon />}
          onClick={submitSelectedExercises}
        >
          Finalizar Treino
        </Button>
      </footer>
    </>
  );
}

/** Exports */
export default ExercisesSheetsComponent;
