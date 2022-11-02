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
  LOGIN_FORM_NOT_FULFILLED = 'Todos os campos do formulário de login devem ser preenchidos.',
  LOGIN_GENERIC_FAIL = 'Falha na autenticação, verifique suas credenciais e tente novamente.',
  PASSWORD_DO_NOT_MATCH_FAIL_MESSAGE = 'As senhas não conferem, por favor verifique os valores informados.',
  PROFILE_FAIL_ON_UPDATE_INFO = 'Suas informações de usuário não puderam ser atualizadas, por favor tente novamente.',
  PROFILE_SUCCESS_ON_UPDATE_INFO = 'Suas informações de usuário foram atualizadas com sucesso.',
  SIGN_UP_FORM_NOT_FULFILLED = 'Todos os campos do formulário de cadastro devem ser preenchidos.',
  SIGN_UP_GENERIC_FAIL = 'Infelizmente não conseguimos concluir seu cadastro, tente novamente em alguns instantes',
}

/**
 * Enumerated values for Toast types configuration.
 */
export enum ToastConfigTypesEnum {
  FAIL = 'fail',
  SUCCESS = 'success',
}
