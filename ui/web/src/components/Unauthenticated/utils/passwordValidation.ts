export function passwordValidation(value: string) {
    const hasAtLeastOneDigit =  /^(?=.*[0-9])$/;
    const hasAtLeastOneLowerCase = /^(?=.*[a-z])$/;
    const hasAtLeastOneUpperCase = /^(?=.*[A-Z])$/;
    if(value.length > 5){
        if(value.length < 8)
            return "Senha deve conter ao menos 8 caracteres";
        if(!hasAtLeastOneDigit.test(value))
            return "Senha deve conter ao menos 1 dígito";
        if(!hasAtLeastOneLowerCase.test(value))
            return "Senha deve conter ao menos 1 caractere minúsculo"
        if(!hasAtLeastOneUpperCase.test(value))
            return "Senha deve conter ao menos 1 caractere maiúsculo"
        return;
    }
    return;
}