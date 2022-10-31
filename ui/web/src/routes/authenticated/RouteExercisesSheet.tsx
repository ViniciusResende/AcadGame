/** React imports */
import React, { useEffect, useState } from 'react';

/** React components */
import ExercisesSheets from '../../components/Authenticated/ExercisesSheets';

/** Library */
import Lib from 'acad-game-lib';

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
    }
  }

  useEffect(() => {
    async function getAvailableExercises() {
      const getUserExercisesSheetsResponse =
        await Lib.exercisesSheet.getUserExercisesSheets();

      return getUserExercisesSheetsResponse;
    }

    getAvailableExercises().then(
      (response) => response && setUserExercisesSheets(response)
    );
  }, []);

  return (
    <ExercisesSheets
      userExercisesSheets={userExercisesSheets}
      saveExerciseEdition={updateExerciseFromSheet}
    />
  );
}

/** Exports */
export default RouteExercisesSheet;
