/** React imports */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** React components */
import ExercisesAdd from '../../components/Authenticated/ExercisesAdd';

/** React Hooks */
import useSecurity from '../middlewares/useSecurity';

/** Library */
import Lib from 'acad-game-lib';

/** Interfaces */
import { IExerciseToAddInfoData } from '../../data/interfaces/ExercisesSheetInterfaces';

function RouteExercisesAdd() {
  useSecurity();
  const { sheetId } = useParams();
  const navigate = useNavigate();

  const [availableExercises, setAvailableExercises] = useState<
    IExerciseToAddInfoData[]
  >([]);

  useEffect(() => {
    async function getAvailableExercises() {
      if (!sheetId) return null;
      const getAvailableExercisesResponse =
        await Lib.exercisesSheet.getAllExercisesAvailableForSheet(sheetId);

      return getAvailableExercisesResponse;
    }

    getAvailableExercises().then(
      (response) => response && setAvailableExercises(response)
    );
  }, []);

  async function addExercisesToSheet(exercisesIds: number[]) {
    if (sheetId) {
      await Lib.exercisesSheet.addExercisesToSheet(sheetId, exercisesIds);
      navigate('/exercisesSheets');
    }
  }

  return (
    <ExercisesAdd
      availableExercisesList={availableExercises}
      addExercisesToSheet={addExercisesToSheet}
    />
  );
}

/** Exports */
export default RouteExercisesAdd;
