export function emailValidation(value: string) {
  if (!value.includes('@')) return;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailRegex.test(value)) return;
  else return 'E-mail inválido';
}

export function passwordValidation(value: string) {
  const hasAtLeastOneDigit = /\d/;
  const hasAtLeastOneLowerCase = /(?=.*[a-z])/;
  const hasAtLeastOneUpperCase = /(?=.*[A-Z])/;
  if (value.length > 5) {
    if (value.length < 8) return 'Senha deve conter ao menos 8 caracteres';
    if (!hasAtLeastOneDigit.test(value))
      return 'Senha deve conter ao menos 1 dígito';
    if (!hasAtLeastOneLowerCase.test(value))
      return 'Senha deve conter ao menos 1 caractere minúsculo';
    if (!hasAtLeastOneUpperCase.test(value))
      return 'Senha deve conter ao menos 1 caractere maiúsculo';
    return;
  }
  return;
}

export function passwordMatchValidation(
  originalPassword: string,
  checkPassword: string
) {
  if (originalPassword === checkPassword) return;

  return 'As senhas não coincidem';
}

export function requiredValidation(value: string) {
  if (!value) return 'Campo obrigatório';
}
