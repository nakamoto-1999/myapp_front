import axios from "axios";
import { useContext } from "react";
import useCollapse from "react-collapsed";
import { Link, useHistory } from "react-router-dom";
import { LoginedUser } from "../App";
import SquareButton from "./SquareButton";
import { ThreadSearchForm } from "./ThreadSearchForm";
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

    return<header className="fixed-top shadow" 
        style={{minHeight : "50px", backgroundColor : "tan" , "zIndex" : 1 }}>

        <div className="p-1" style={{display : "flex"}}>

            <div style={{fontSize : "20px" , fontFamily : "Kokoro" , color : "maroon"}} onClick={toTop}>
                訴訟ごっこ.net
            </div>
            
            <div style={{margin : "0 0 0 auto"}}>
                {loginUser !== null?
                <span>
                    {loginUser.role.name === "ADMIN" &&
                        <span style={{"marginRight" : "16px"}}>
                            <SquareButton value="Admin" color="info" onClick = {toUserAdmin}/>
                        </span>
                    }
                    <UserMenu/>
                </span>
                :
                <span>
                    <span style={{marginRight : "5px"}}>
                        <SquareButton value="Login" color="primary" onClick = {toLogin}/>
                    </span>
                    <span>
                        <SquareButton value="Register" color="success" onClick = {toRegister}/>
                    </span>
                </span>
                }
            </div>

        </div>

        <div style={{marginTop : "5px" , marginBottom : "5px"}}>
            <ThreadSearchForm/>
        </div>
        
        {loginUser !== null && !loginUser.permitted &&
            <div className="bg-light text-danger text-center w-100"
                style={{"zIndex" : 2 , marginTop : "5px"}}>
                アカウントは、一部の機能の利用停止処分中です。
            </div>
        }
    </header>
}

export default Header; 