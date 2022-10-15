import React, { createContext, useContext, useEffect, useState } from "react";
import ThreadInfo from "./ThreadInfo";
import PostCreateForm from "./PostCreateForm"
import ReloadButton from "./ReloadButton";
import ToBottomButton from "./ToBottomButton";
import { api } from "../api";
import { LoginedUser } from "../App";
import { ReloadFunc } from "../context";

const Thread = createContext(null);

export const ThreadPage = (props) => {

    const loginUser = useContext(LoginedUser);

    const [thread , setThread] = useState(null);

    const loadThread = ()=>{
        api.get(`/thread/${props.match.params.id}`)
        .then(res => {
            console.log(res.data);
            //データが無効なものであるならば404エラーに遷移
            !res.data.deleted ?
                setThread(res.data)
            :
                window.location.replace("not-found")
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
                ,right : "20px",top : "80px", zIndex : 1 }}>
                    <ToBottomButton/>
                </div>

                <div style={{position : "fixed"
                ,left : "20px",top : "80px", zIndex : 1 }}>
                    <ReloadButton func = {loadThread}/>
                </div>
                
                <ReloadFunc.Provider value={loadThread}>

                    <div className = "container" style={{paddingBottom : "350px"}}>
                        <ThreadInfo thread = {thread}/>
                    </div>
                    
                    {loginUser !== null &&
                        <div className="fixed-bottom p-3" style={{backgroundColor : "lemonchiffon"}}>
                            <div style={{fontSize : "12px" , marginBottom : "10px", color : "grey"}}>
                                スレッドは、{thread.finishAt}頃に閉鎖されます。
                            </div>
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

