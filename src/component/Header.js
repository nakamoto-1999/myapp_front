import axios from "axios";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginedUser } from "../App";
import SquareButton from "./SquareButton";
import UserMenu from "./UserMenu";


const Header = ()=>{

    const loginUser = useContext(LoginedUser);

    const history = useHistory();

    const toLogin = (e)=>{
        e.preventDefault();
        history.push("/login");
    }

    const toRegister = (e)=>{
        e.preventDefault();
        history.push("/register");
    }

    const toUserAdmin = (e) =>{
        e.preventDefault();
        history.push("/admin");
    }

    const toTop = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return<header className="fixed-top shadow p-2" 
        style={{minHeight : "50px", backgroundColor : "tan" , "zIndex" : 1 ,
        display : "flex"}}>

        <div style={{fontSize : "31px" , fontFamily : "Impact" , color : "dimgray"}} onClick={toTop}>
            Commoard
        </div>
        
        <div style={{margin : "0 0 0 auto"}}>
            {loginUser !== null?
            <span>
                {loginUser.role.name === "ADMIN" &&
                    <span style={{"marginRight" : "32px"}}>
                        <SquareButton value="管理画面" color="info" onClick = {toUserAdmin}/>
                    </span>
                }
                <UserMenu/>
            </span>
            :
            <span>
                <span style={{marginRight : "16px"}}>
                    <SquareButton value="ログイン" color="primary" onClick = {toLogin}/>
                </span>
                <span>
                    <SquareButton value="新規登録" color="success" onClick = {toRegister}/>
                </span>
            </span>
            }
        </div>
        
        {loginUser !== null && !loginUser.permitted &&
            <div className="bg-light text-danger text-center w-100"
                style={{"position" : "absolute" , "left" : "0px" , "top" : "55px" , "zIndex" : 2}}>
                このアカウントは、「スレッド作成」「書き込み」の2つの機能について、利用停止処分となっております。
            </div>
        }
    </header>
}

export default Header; 