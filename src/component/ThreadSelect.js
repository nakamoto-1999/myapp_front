
import ThreadForm, { ThreadCreateForm } from "./ThreadCreateForm";
import ThreadTable from "./ThreadIndex";
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import {BsArrowCounterclockwise, BsPlus } from "react-icons/bs";

import { LoginedUser } from "../App";
import { Link } from "react-router-dom";


import ReloadButton from "./ReloadButton";
import { api } from "../api";
import ThreadIndex from "./ThreadIndex";
import { ReloadFunc } from "../context";
import { H } from "./H";

const ThreadSelect = ()=>{

    const loginUser = useContext(LoginedUser);

    const [threads , setThreads] = useState([]);

    const loadThreads = ()=>{
        api.get("/thread")
        .then((res)=>{
            setThreads(res.data);
        });
    }
    
    useEffect(loadThreads, []);


    return<div>

        <div style={{paddingBottom : "150px"}}>
            <ThreadIndex threads={threads}/>
        </div>

        <div style={{position : "fixed" ,left : "10px", bottom : "20px", zIndex : 2}}>
            <ReloadButton func = {loadThreads}/>
        </div>

        {loginUser !== null &&
            <ThreadCreateForm/>
        }
        
    </div>

}

export default ThreadSelect;