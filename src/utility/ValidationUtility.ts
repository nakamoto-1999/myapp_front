
export const isEmpty = (val : string) : boolean =>{
    return val == null || val === "";
} 


export const isHalf = (val : string) : boolean => {
    let regExp : RegExp = new RegExp("^[a-zA-Z0-9!-/:-@¥[-`{-~]*$");
    return regExp.test(val);
}


export const isEmailFormat = (val : string) : boolean => {
    let regExp : RegExp = new RegExp("^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]*.[A-Za-z0-9]*$");
    return regExp.test(val);
}