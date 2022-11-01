/**
 * @category Enum
 * @module ToastEnums
 */

/**
 * Enumerated values for Toast events types.
 */
export enum ToastEventTypesEnum {
  NEW_TOAST_DISPATCH = 'new_toast_dispatch',
}

/**
 * Enumerated values for Toast duration configuration.
 */
export enum ToastConfigDurationEnum {
  SHORT = 2000,
  MEDIUM = 5000,
  LONG = 10000,
}

/**
 * Enumerated values for Toast messages configuration.
 */
export enum ToastConfigMessagesEnum {
  GENERIC_FAIL_MESSAGE = 'Alguma coisa aconteceu, por favor tente novamente mais tarde.',
  SIGN_UP_GENERIC_FAIL = 'Infelizmente não conseguimos concluir seu cadastro, tente novamente em alguns instantes',
}

/**
 * Enumerated values for Toast types configuration.
 */
export enum ToastConfigTypesEnum {
  FAIL = 'fail',
  SUCCESS = 'success',
}
