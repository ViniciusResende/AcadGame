/** React imports */
import React, { useEffect, useState } from 'react';

/** React components */
import ExercisesSheets from '../../components/Authenticated/ExercisesSheets';

/** Library */
import Lib from 'acad-game-lib';

/** Helpers */
import { dispatchFeedbackToast } from '../../helpers';

/** Enums */
import { ExercisesSheetEventTypesEnum } from '../../data/enums/ExercisesSheetEnums';
import {
  ToastConfigDurationEnum,
  ToastConfigMessagesEnum,
  ToastConfigTypesEnum,
} from '../../data/enums/ToastEnums';

/** Interfaces */
import {
  IExercisesSheetInfoData,
  ISheetExerciseInfoData,
} from '../../data/interfaces/ExercisesSheetInterfaces';

function updateUserExercisesSheetWithUpdatedExercise(
  originalSheets: IExercisesSheetInfoData[],
  updatedSheetId: string,
  updatedExercise: ISheetExerciseInfoData
) {
  const sheetIdIdx = Number(updatedSheetId) - 1;

  const sheetBeingUpdated = originalSheets[sheetIdIdx];
  const updatedSheetNewExercisesArray = sheetBeingUpdated.exercises.map(
    (exercise) => {
      if (exercise.exerciseId === updatedExercise.exerciseId)
        return updatedExercise;
      else return exercise;
    }
  );

  let newSheets = [...originalSheets];
  newSheets[sheetIdIdx].exercises = updatedSheetNewExercisesArray;

  return newSheets;
}

function RouteExercisesSheet() {
  const [userExercisesSheets, setUserExercisesSheets] = useState<
    IExercisesSheetInfoData[]
  >([]);
  const [exercisesToSubmitHashMap, setExercisesToSubmitHashMap] = useState<
    Record<string, ISheetExerciseInfoData[]>
  >({});

  async function updateExerciseFromSheet(
    sheetId: string,
    updatedExerciseData: ISheetExerciseInfoData
  ) {
    const libUpdatedExerciseData = {
      sheetId,
      updatedExercise: updatedExerciseData,
    };

    const updateExerciseFromSheetResponse =
      await Lib.exercisesSheet.updateExerciseOnSheet(libUpdatedExerciseData);

    if (updateExerciseFromSheetResponse) {
      setUserExercisesSheets((prev) =>
        updateUserExercisesSheetWithUpdatedExercise(
          prev,
          sheetId,
          updateExerciseFromSheetResponse
        )
      );
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.SUCCESS,
        message: ToastConfigMessagesEnum.EXERCISES_SHEET_SUCCESS_ON_UPDATE,
        timeToClose: ToastConfigDurationEnum.MEDIUM,
      });
    } else {
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.FAIL,
        message: ToastConfigMessagesEnum.EXERCISES_SHEET_FAIL_ON_UPDATE,
        timeToClose: ToastConfigDurationEnum.MEDIUM,
      });
    }
  }

  function addExerciseToSubmit(exercise: ISheetExerciseInfoData) {
    const exerciseHashKey = String(exercise.exerciseId);

    const newExercisesToSubmit = Object.assign({}, exercisesToSubmitHashMap);
    if (!newExercisesToSubmit[exerciseHashKey])
      newExercisesToSubmit[exerciseHashKey] = new Array();

    newExercisesToSubmit[exerciseHashKey].push(exercise);

    setExercisesToSubmitHashMap(newExercisesToSubmit);
  }

  function removeExerciseToSubmit(exerciseId: number) {
    const exerciseHashKey = String(exerciseId);

    const newExercisesToSubmit = Object.assign({}, exercisesToSubmitHashMap);

    newExercisesToSubmit[exerciseHashKey].pop();

    setExercisesToSubmitHashMap(newExercisesToSubmit);
  }

  async function submitSelectedExercises() {
    try {
      const selectedExercisesToSubmitSheets = Object.values(
        exercisesToSubmitHashMap
      ).flat(1);

      await Lib.exercisesSheet.submitSelectedExercisesFromUserSheets(
        selectedExercisesToSubmitSheets
      );
      setExercisesToSubmitHashMap({});
      Lib.utils.publish(
        ExercisesSheetEventTypesEnum.EXERCISES_SHEETS_SUBMITTED
      );
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.SUCCESS,
        message: ToastConfigMessagesEnum.EXERCISES_SHEET_SUCCESS_ON_SUBMIT,
        timeToClose: ToastConfigDurationEnum.LONG,
      });
    } catch (error) {
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.FAIL,
        message: ToastConfigMessagesEnum.EXERCISES_SHEET_FAIL_ON_SUBMIT,
        timeToClose: ToastConfigDurationEnum.MEDIUM,
      });
    }
  }

  useEffect(() => {
    async function getUserSheets() {
      const getUserExercisesSheetsResponse =
        await Lib.exercisesSheet.getUserExercisesSheets();

      return getUserExercisesSheetsResponse;
    }

    getUserSheets().then(
      (response) => response && setUserExercisesSheets(response)
    );
  }, []);

  return (
    <ExercisesSheets
      userExercisesSheets={userExercisesSheets}
      saveExerciseEdition={updateExerciseFromSheet}
      addExerciseToSubmit={addExerciseToSubmit}
      removeExerciseToSubmit={removeExerciseToSubmit}
      submitSelectedExercises={submitSelectedExercises}
    />
  );
}

/** Exports */
export default RouteExercisesSheet;
