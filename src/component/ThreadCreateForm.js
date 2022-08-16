import { useContext, useState } from "react"
import axios from "axios";

import { useHistory, withRouter } from "react-router-dom";

import { BsFillXSquareFill, BsPlus } from "react-icons/bs";

import useCollapse from "react-collapsed";
import NewButton from "./NewButton";
import { api } from "../api";
import { BiSend } from "react-icons/bi";
import { ReloadFunc } from "../context";
import { LoginedUser } from "../App";

export const ThreadCreateForm = (props)=>{

    const loginUser = useContext(LoginedUser);

    const {getCollapseProps , getToggleProps , isExpanded} = useCollapse();

    const history = useHistory();

    const [title , setTitle] = useState("");

    const changeFormDataTitle = (e)=>{
        e.preventDefault();
        setTitle(e.target.value);
    }

    const submit = (e)=>{
        e.preventDefault();
        api.post("/auth/thread/create" , {title : title})
        .then(res => {
            const createdThread = res.data;
            history.push(`thread/${createdThread.threadId}`);
        })
        .catch(err=>{
            window.alert("スレッドの作成に失敗しました。");
        });
            
    }

    return<div>

        <div style={{position : "fixed" , right : "10px" , bottom : "20px" , zIndex : 2}}>
            <button className="rounded btn btn-primary p-2" {...getToggleProps()}
                disabled={isExpanded || loginUser !== null && !loginUser.permitted}>
                <BsPlus size = {30}/>
            </button>
        </div>
            
        <div className="w-100" style={{position : "fixed" ,left : "0px",top : "200px" ,zIndex : 2}}>
            <section {...getCollapseProps()}>

                    <div className="container rounded" style={{backgroundColor : "wheat"}}>

                        <span {...getToggleProps()}>
                            <BsFillXSquareFill size = "30"/>
                        </span>

                        <form className="form p-4">
                            <div className="form-group">
                                <textarea 
                                    id="thread-title" className="form-control" onChange={changeFormDataTitle}
                                    style = {{minHeight : "120px"}}  disabled={loginUser !== null && !loginUser.permitted}
                                />
                            </div>
                            <button className="btn btn-primary w-25" onClick={submit} disabled={title === ""}>
                                <BiSend size={25}/>
                            </button>
                        </form>

                    </div>
            </section>
        </div>
    </div>;

}

