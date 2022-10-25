import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { api } from "../api";

export const login = (email:String , password:String) =>{
    console.log(email);
    console.log(password);
    api.post("/login" , {email : email , password : password})
    .then(res=>{
        window.location.replace("/");
    })
    .catch(err => {
        err.response.status === 401 &&
        window.alert("ログインに失敗しました。");
    });
 }
    

export const logout = ()=>{
    api.post("/logout")
    .then(res=>{
        window.location.replace("/");
    });
}




