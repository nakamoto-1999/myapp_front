import axios from "axios";
import { useContext, useState } from "react";
import { BiSend } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LoginedUser } from "../App";
import { useDidUpdateEffect } from "../hook/useDidUpdateEffect.ts";
import { login } from "../utility/LoginUtility.ts";
import { isEmpty } from "../utility/ValidationUtility.ts";
import { H } from "./H";
import { NoAuthorization } from "./NoAuthorization";

const LoginForm = ()=>{

    const loginUser = useContext(LoginedUser);

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const [isEmailValidated , setIsEmailValidated] = useState(false);
    const [isPassValidated , setIsPassValidated] = useState(false);

    const [errForEmail , setErrForEmail] = useState("");
    const [errForPass , setErrForPass] = useState("");

    useDidUpdateEffect(()=>{
        if(isEmpty(email)){
            setIsEmailValidated(false);
            setErrForEmail("メールアドレスが未入力です。");
            return;
        }
        setIsEmailValidated(true);
        setErrForEmail("");
    } ,[email]);

    useDidUpdateEffect(()=>{
        if(isEmpty(password)){
            setIsPassValidated(false);
            setErrForPass("パスワードが未入力です。");
            return;
        }
        setIsPassValidated(true);
        setErrForPass("");
    } ,[password]);

    const history = useHistory();

    const changeEmail = (e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }

    const changePassword = (e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    
    const submit = (e)=>{
        e.preventDefault();
        login(email , password);
    }

    return<div className="container w-75 bg-light p-3">
        <NoAuthorization redirect = "/"/>
        <H content={"ログイン"}/>
        <form className="form">
            <div className="form-group">
                <label>Email</label>
                <input id="email" className="form-control" onChange={changeEmail}/>
                <div class="text-danger">{errForEmail}</div>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input id="password" type="password" className="form-control" onChange={changePassword}/>
                <div class="text-danger">{errForPass}</div>
            </div>
            <div className="form-group">
                <button className="form-control btn w-25 btn-primary" onClick={submit} 
                disabled={!isEmailValidated || !isPassValidated}>
                    <BiSend size={25}/>
                </button>
            </div>
        </form>
    </div>;
}


export default LoginForm;