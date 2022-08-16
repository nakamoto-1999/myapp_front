import React, { createContext, useContext, useEffect, useState } from "react";
import ThreadInfo from "./ThreadInfo";
import PostCreateForm from "./PostCreateForm"
import ReloadButton from "./ReloadButton";
import ToBottomButton from "./ToBottomButton";
import { api } from "../api";
import { LoginedUser } from "../App";
import { ReloadFunc } from "../context";



function Thread(props){

    const loginUser = useContext(LoginedUser);

    const [thread , setThread] = useState(null);

    const loadThread = ()=>{
        api.get(`/thread/${props.match.params.id}`)
        .then(res => {
            setThread(res.data);
        })
        .catch(err => {
            //スレッドの取得に失敗した場合は404エラーに遷移
            window.location.replace("/not-found");
        });
    }

    useEffect(loadThread, []);

    return<div>
        {thread !== null &&
            <div>

                <div style={{position : "fixed"
                ,right : "20px",top : "80px", zIndex : 2 }}>
                    <ToBottomButton/>
                </div>

                <div style={{position : "fixed"
                ,left : "20px",top : "80px", zIndex : 2 }}>
                    <ReloadButton func = {loadThread}/>
                </div>
                
                <ReloadFunc.Provider value={loadThread}>

                    <div className = "container" style={{paddingBottom : "350px"}}>
                        <ThreadInfo thread = {thread}/>
                    </div>
                    
                    {loginUser !== null &&
                        <div className="fixed-bottom p-3" style={{backgroundColor : "lemonchiffon"}}>
                            <div className="container w-100">
                                <PostCreateForm thread={thread}/>
                            </div>
                        </div>
                    }

                </ReloadFunc.Provider>
            </div>

            
        }
    </div>
}

export default Thread;