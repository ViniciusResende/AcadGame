/** Library */
import Lib from 'acad-game-lib';

/** Enums */
import { ToastEventTypesEnum } from '../data/enums/ToastEnums';

/** Types */
import { ToastCallPayload } from '../data/types/ToastTypes';

export function dispatchFeedbackToast(toastConfig?: ToastCallPayload) {
  Lib.utils.publish(ToastEventTypesEnum.NEW_TOAST_DISPATCH, toastConfig);
}
