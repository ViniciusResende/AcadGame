/**
 * @category Type
 * @module ToastTypes
 */

/** Enums */
import {
  ToastConfigDurationEnum,
  ToastConfigMessagesEnum,
  ToastConfigTypesEnum,
} from '../enums/ToastEnums';

/**
 * Type for generic Toast calls payload.
 */
export type ToastCallPayload = {
  type: ToastConfigTypesEnum;
  message: ToastConfigMessagesEnum;
  timeToClose: ToastConfigDurationEnum;
};
