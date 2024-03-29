/** React imports */
import React, { useEffect, useState } from 'react';

/** React Components */
import Button from '../../../../Common/Button';
import Input from '../../../../Common/Input';
import Modal from '../../../../Common/Modal';

/** Styles */
import './ExerciseUpdateModal.scss';

/** Interfaces */
import { ISheetExerciseInfoData } from '../../../../../data/interfaces/ExercisesSheetInterfaces';

type ExerciseUpdateModalComponentProps = {
  exerciseBeingEdited: ISheetExerciseInfoData | null;
  isOpen: boolean;
  saveEdition: (updatedExerciseData: ISheetExerciseInfoData) => void;
  handleOnClose: () => void;
};
function ExerciseUpdateModalComponent({
  exerciseBeingEdited,
  isOpen,
  saveEdition,
  handleOnClose,
}: ExerciseUpdateModalComponentProps) {
  const [shouldUnmountInputs, setShouldUnmountInputs] = useState(false);

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();

    function getInputNumberValue(inputElem: HTMLInputElement): number {
      return Number(inputElem.value);
    }

    //@ts-ignore
    const { numSets, numRepetitions, load, time } = event.target;
    let newExerciseAfterEdition: ISheetExerciseInfoData | null = null;

    if (exerciseBeingEdited?.isLoad) {
      newExerciseAfterEdition = {
        ...exerciseBeingEdited,
        numSets: getInputNumberValue(numSets),
        numRepetitions: getInputNumberValue(numRepetitions),
        load: getInputNumberValue(load),
        time: null,
      };
    } else if (exerciseBeingEdited) {
      newExerciseAfterEdition = {
        ...exerciseBeingEdited,
        numSets: getInputNumberValue(numSets),
        numRepetitions: null,
        load: null,
        time: getInputNumberValue(time),
      };
    }

    newExerciseAfterEdition && saveEdition(newExerciseAfterEdition);
    setShouldUnmountInputs(true);
  }

  useEffect(() => {
    if (isOpen) setShouldUnmountInputs(false);
  }, [isOpen]);

  function renderLoadExerciseInputs() {
    return (
      <>
        <Input
          className="exercise-update__edition-input"
          controlId="numSets"
          inputLabel="Séries"
          name="numSets"
          defaultValue={exerciseBeingEdited?.numSets}
        />
        <Input
          className="exercise-update__edition-input"
          controlId="numRepetitions"
          inputLabel="Repetições"
          name="numRepetitions"
          defaultValue={exerciseBeingEdited?.numRepetitions || undefined}
        />
        <Input
          className="exercise-update__edition-input"
          controlId="load"
          inputLabel="Peso"
          name="load"
          unitOfMeasurementTag="kg"
          defaultValue={exerciseBeingEdited?.load || undefined}
        />
      </>
    );
  }

  function renderTimeExerciseInputs() {
    return (
      <>
        <Input
          className="exercise-update__edition-input"
          controlId="numSets"
          inputLabel="Séries"
          name="numSets"
          defaultValue={exerciseBeingEdited?.numSets}
        />
        <Input
          className="exercise-update__edition-input"
          controlId="time"
          inputLabel="Tempo"
          name="time"
          unitOfMeasurementTag="min"
          defaultValue={exerciseBeingEdited?.time || undefined}
        />
      </>
    );
  }

  return (
    <Modal
      title="Edição Exercício"
      isOpen={isOpen}
      handleOnClose={() => {
        handleOnClose();
        setShouldUnmountInputs(true);
      }}
    >
      <form className="exercise-update__form" onSubmit={onSubmitForm}>
        {!shouldUnmountInputs && (
          <>
            <h3 className="exercise-update__title">
              {exerciseBeingEdited?.name}
            </h3>
            {exerciseBeingEdited?.isLoad
              ? renderLoadExerciseInputs()
              : renderTimeExerciseInputs()}
            <Button
              className="exercise-update__submit-btn"
              modifier="default"
              type="submit"
              onClick={() => {
                handleOnClose();
              }}
            >
              Confirmar
            </Button>
          </>
        )}
      </form>
    </Modal>
  );
}

/** Exports */
export default ExerciseUpdateModalComponent;
