
export function emailValidation(value: string) {
    if(!value.includes("@")) return;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(emailRegex.test(value)) return;
    else return "E-mail inválido.";
}