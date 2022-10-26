
import ThreadForm, { ThreadCreateForm } from "./ThreadCreateForm";
import ThreadTable from "./ThreadIndex";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import {BsArrowCounterclockwise, BsPlus } from "react-icons/bs";

import { LoginedUser } from "../App";
import { Link } from "react-router-dom";


import { api } from "../api";
import ThreadIndex from "./ThreadIndex";
import { ReloadFunc } from "../context";
import { H } from "./H";

export const Threads = createContext([]);
export const LoadThreads = createContext(() => {});

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

    return<div className="border-top" style={{paddingTop : "16px"}}>
        <H content={"スレッド一覧"}/>
        <Threads.Provider value={threads}>
            <ThreadIndex/>
        </Threads.Provider>

        {loginUser !== null &&
            <ThreadCreateForm/>
        }
        
    </div>

}

export default ThreadSelect;