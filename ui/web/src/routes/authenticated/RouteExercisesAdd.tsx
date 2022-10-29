/** React imports */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/** React components */
import ExercisesAdd from '../../components/Authenticated/ExercisesAdd';

/** Library */
import Lib from 'acad-game-lib';

/** Interfaces */
import { IExerciseToAddInfoData } from '../../data/interfaces/ExercisesSheetInterfaces';

function RouteExercisesAdd() {
  const { sheetId } = useParams();

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

  return <ExercisesAdd availableExercisesList={availableExercises} />;
}

/** Exports */
export default RouteExercisesAdd;
