import userEvent from "@testing-library/user-event";
import { useContext, useEffect, useRef, useState } from "react";
import { BsCardList, BsPencil, BsPersonCircle } from "react-icons/bs";
import {BiLogOut, BiTrash} from "react-icons/bi"
import { LoginedUser } from "../App";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../utility/LoginUtility.ts";
import { DeleteUser } from "./DeleteUser";
import useCollapse from "react-collapsed";
import { api } from "../api";

const UserMenu = (props) => {

    const history = useHistory();
    const loginUser = useContext(LoginedUser);

    const [isOpen , setIsOpen] = useState(false);
    const menuRef = useRef();

    useEffect(()=> {
        isOpen && menuRef.current.focus();
    }  ,[isOpen]);

    const toEdit = (e) => {
        e.preventDefault();     
        history.push(`/user/${loginUser.userId}/edit`);
    }

    const toThredIndex = (e)=>{
        e.preventDefault();
        history.push(`/user/${loginUser.userId}/thread`);
    }

    return<span>
        <span onClick={() => setIsOpen(isOpen ? false : true)}>
            <BsPersonCircle class = "rounded-circle p-1" style = {{backgroundColor : "lavender"}} size={40}/>
        </span>
        {isOpen && 
            <div 
                onBlur={() => setIsOpen(false)}
                ref={menuRef} 
                className = "shadow"
                tabIndex={4}
                style={{position : "fixed" ,right : "30px" , zIndex : 10}}
            >
                {loginUser != null &&
                    <ul className="list-group list-group-flush text-center">
                        
                        <li className="list-group-item">
                            <strong>
                                {loginUser.name}
                                {loginUser.role.name === "ADMIN" &&
                                    "(管理者)"
                                }
                            </strong>
                        </li>

                        <li className="list-group-item list-group-item-action" onClick={toThredIndex}>
                            <BsCardList size={19}/>&nbsp;スレッド
                        </li>

                        <li className="list-group-item list-group-item-action" onClick={toEdit}>
                            <BsPencil size={19}/>&nbsp;編集
                        </li>

                        <li className="list-group-item list-group-item-action" onClick={logout}>
                            <BiLogOut size={19}/>&nbsp;ログアウト
                        </li>

                        <li className="list-group-item list-group-item-action">
                            <DeleteUser userId = {loginUser.userId}/>
                        </li>


                    </ul>
                }
            </div>
        }
    </span>

}

export default UserMenu;