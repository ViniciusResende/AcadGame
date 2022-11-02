/** React imports */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** React components */
import ExercisesAdd from '../../components/Authenticated/ExercisesAdd';

/** React Hooks */
import useSecurity from '../middlewares/useSecurity';

/** Library */
import Lib, { ExercisesSheetExerciseToAddTypeEnum } from 'acad-game-lib';

/** Helpers */
import { dispatchFeedbackToast } from '../../helpers';

/** Enums */
import {
  ToastConfigDurationEnum,
  ToastConfigMessagesEnum,
  ToastConfigTypesEnum,
} from '../../data/enums/ToastEnums';

/** Interfaces */
import { IExerciseToAddInfoData } from '../../data/interfaces/ExercisesSheetInterfaces';

function RouteExercisesAdd() {
  useSecurity();
  const { sheetId } = useParams();
  const navigate = useNavigate();

  const [availableExercises, setAvailableExercises] = useState<
    IExerciseToAddInfoData[]
  >([]);

  async function getAvailableExercises(
    filterType: ExercisesSheetExerciseToAddTypeEnum | undefined = undefined
  ) {
    if (!sheetId) return null;
    const getAvailableExercisesResponse =
      await Lib.exercisesSheet.getAllExercisesAvailableForSheet(
        sheetId,
        filterType
      );

    return getAvailableExercisesResponse;
  }

  useEffect(() => {
    getAvailableExercises().then(
      (response) => response && setAvailableExercises(response)
    );
  }, []);

  async function filterExercisesBy(
    filterType: ExercisesSheetExerciseToAddTypeEnum
  ) {
    getAvailableExercises(filterType).then(
      (response) => response && setAvailableExercises(response)
    );
  }

  async function addExercisesToSheet(exercisesIds: number[]) {
    if (sheetId) {
      await Lib.exercisesSheet.addExercisesToSheet(sheetId, exercisesIds);
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.SUCCESS,
        message: ToastConfigMessagesEnum.EXERCISES_ADD_SUCCESS_MESSAGE,
        timeToClose: ToastConfigDurationEnum.MEDIUM,
      });
      navigate('/exercisesSheets');
    }
  }

  return (
    <ExercisesAdd
      availableExercisesList={availableExercises}
      filterExercisesBy={filterExercisesBy}
      addExercisesToSheet={addExercisesToSheet}
    />
  );
}

/** Exports */
export default RouteExercisesAdd;
