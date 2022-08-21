import axios from "axios";
import { useEffect, useState } from "react";
import { BiMailSend, BiSend } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { api } from "../api";
import { useDidUpdateEffect } from "../hook/useDidUpdateEffect.ts";
import { login } from "../utility/LoginUtility.ts";
import { isEmailFormat, isEmpty, isHalf , isOver } from "../utility/ValidationUtility.ts";


const UserForm = (props)=>{

    const history = useHistory();

    const [name , setName] = useState(props.pName);
    const [email , setEmail] = useState(props.pEmail);
    const [password , setPassword] = useState("");
    const [passConf , setPassConf] = useState("");

    const [isNameValidated, setIsNameValidated] = useState(false);
    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [isPassValidated, setIsPassValidated] = useState(false);
    const [isPassConfValidated , setIsPassConfValidated] = useState(false);

    const [errForName , setErrForName] = useState("");
    const [errForEmail , setErrForEmail] = useState("");
    const [errForPass , setErrForPass] = useState("");
    const [errForPassConf , setErrForPassConf] = useState("");

    const changeName = (e)=>{
        e.preventDefault();
        setName(e.target.value);
    }

    const changeEmail = (e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }

    const changePassword = (e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    }

    const changePassConf = (e)=>{
        e.preventDefault();
        setPassConf(e.target.value);
    }

    const submit = (e)=>{
        e.preventDefault();

        //メソッドによって分ける
        props.httpMethod === "POST" ?

            api.post(props.submitUrl , {name : name , email : email , password : password})
            .then(res => {
                login(email , password);
            })
        :
            api.put(props.submitUrl , {name : name , email : email , password : password})
            .then(res => {
                login(email , password);
            })
        
    }

    //初期値へのバリデーション
    useEffect(() => {
        !isEmpty(name) && setIsNameValidated(true);
        !isEmpty(email) &&setIsEmailValidated(true);
    } , [])

    //nameへのバリデーション
    useDidUpdateEffect(() => {
        if(isEmpty(name)){
            setIsNameValidated(false);
            setErrForName("名前が未入力です。");
            return;
        }
        setIsNameValidated(true);
        setErrForName("");
    } , [name]);

    useDidUpdateEffect(() => {
        if(isEmpty(email)){
            setIsEmailValidated(false);
            setErrForEmail("メールアドレスが未入力です。");
            return;
        }
        if(!isEmailFormat(email)){
            setIsEmailValidated(false);
            setErrForEmail("メールアドレス形式で入力してください。");
            return;
        }
        api.get(`/user/is-email-exist/${email}`)
        .then(res => {
            if(res.data){
                setIsEmailValidated(false);
                setErrForEmail("このメールアドレスは、既に使用されています。");
                return;
            }
            setIsEmailValidated(true);
        })
        .finally(onFinally => {
            //通信エラーが起きたは、エラーメッセージのみ消去する
            setErrForEmail("");
        })
    } , [email]);

    //passwordへのバリデーション
    useDidUpdateEffect(() => {
        if(isEmpty(password)){
            setIsPassValidated(false);
            setErrForPass("パスワードが未入力です。");
            return;
        }
        if(!isHalf(password) || !isOver(password , 8)){
            setIsPassValidated(false);
            setErrForPass("パスワードは、8文字以上の半角英数字記号で入力してください。");
            return;
        }
        setIsPassValidated(true);
        setErrForPass("");
    } , [password]);

    //passwordのバリデーション
    useDidUpdateEffect(() => {

        if(isEmpty(passConf)){
            setIsPassConfValidated(false);
            setErrForPassConf("確認用パスワードが未入力です。");
            return;
        }

        if(password !== passConf){
            setIsPassConfValidated(false);
            setErrForPassConf("パスワードと一致しません。");
            return;
        }
        setIsPassConfValidated(true);
        setErrForPassConf("");

    } , [password ,passConf]);



    return<div>
        <form className="form">
            <div className="form-group">
                <label>ユーザー名</label>
                <input className="form-control" onChange={changeName} value={name}/>
                <div className="text-danger">
                    {errForName}
                </div>
            </div>
            <div className="form-group">
                <label>メールアドレス</label>
                <input className="form-control" onChange={changeEmail} value={email}/>
                <div className="text-danger">
                    {errForEmail}
                </div>
            </div>
            <div className="form-group">
                <label>パスワード</label>
                <input type="password" className="form-control" onChange={changePassword}
                value={password}/>
                <div className="text-danger">
                    {errForPass}
                </div>
            </div>
            <div className="form-group">
                <label>パスワード（確認用）</label>
                <input type="password" className="form-control" onChange={changePassConf}
                value={passConf}/>
                <div className="text-danger">
                    {errForPassConf}
                </div>
            </div>
            <div className="form-group">
                <button className="form-control btn w-25 btn-primary" onClick={submit}
                disabled ={!isNameValidated || !isEmailValidated || !isPassValidated 
                || !isPassConfValidated}>
                    <BiSend size={25}/>
                </button>
            </div>
        </form>
    </div>
}

export default UserForm;