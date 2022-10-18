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

    const [overview , setOverveiw] = useState("");
    const [point , setPoint] = useState("");
    const [red , setRed] = useState("");
    const [blue , setBlue] = useState("");

    const changeOverview = (e)=>{
        e.preventDefault();
        setOverveiw(e.target.value);
    }

    const changePoint = (e) => {
        e.preventDefault();
        setPoint(e.target.value);
    }

    const changeRed = (e) => {
        e.preventDefault();
        setRed(e.target.value);
    }

    const changeBlue = (e) => {
        e.preventDefault();
        setBlue(e.target.value);
    }

    const submit = (e)=>{
        e.preventDefault();
        api.post("/auth/thread/create" , 
        {overview : overview , point : point , red : red , blue : blue})
        .then(res => {
            const createdThread = res.data;
            history.push(`thread/${createdThread.threadId}`);
        })
        .catch(err=>{
            window.alert("スレッドの作成に失敗しました。");
        });
            
    }

    return<div>

        <div style={{position : "fixed" , right : "10px" , bottom : "20px" , zIndex : 1}}>
            <button className="rounded btn btn-primary p-2" {...getToggleProps()}
                disabled={isExpanded || loginUser !== null && !loginUser.permitted}>
                <BsPlus size = {30}/>
            </button>
        </div>
            
        <div className="w-100 fixed-bottom" style={{zIndex : 1}}>
            <section {...getCollapseProps()}>

                    <div className="overflow-auto container rounded" style={{backgroundColor : "wheat" }}>

                        <span {...getToggleProps()}>
                            <BsFillXSquareFill size = "30" />
                        </span>

                        <form className="form p-4 overflow-auto" style={{maxHeight : "180px"}}>
                            <div className="form-group">
                                <label style={{color : "black"}}>
                                    <strong>議題の概要</strong>
                                </label>
                                <textarea 
                                    id="overview" className="form-control" onChange={changeOverview}
                                    style = {{minHeight : "100px"}} value = {overview}
                                />
                                <label style={{color : "black"}}>
                                    <strong>争点</strong>
                                </label>
                                <textarea 
                                    id="point" className="form-control" onChange={changePoint}
                                    style = {{minHeight : "100px"}} value = {point}
                                />
                                <label style = {{color : "red"}}>
                                    <strong>赤のポジション</strong>
                                </label>
                                <input id="red" className="form-control" onChange={changeRed} value = {red} style = {{color : "red"}}/>
                                <label style = {{color : "blue"}}>
                                    <strong>青のポジション</strong>
                                </label>
                                <input id="blue" className="form-control" onChange={changeBlue} value = {blue} style = {{color : "blue"}}/>
                            </div>
                            <button className="btn btn-primary w-25" onClick={submit} 
                                disabled={(overview === "" || point === "" || red === "" || blue === "")}>
                                <BiSend size={25}/>
                            </button>
                        </form>

                    </div>
            </section>
        </div>
    </div>;

}

