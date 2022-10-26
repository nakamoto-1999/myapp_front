import React, { createContext, useContext, useEffect, useState } from "react";
import ThreadInfo from "./ThreadInfo";
import PostCreateForm from "./PostCreateForm"
import ReloadButton from "./ReloadButton";
import ToBottomButton from "./ToBottomButton";
import { api } from "../api";
import { LoginedUser } from "../App";
import { ReloadFunc } from "../context";
import { ThreadConcludeForm } from "./ThreadConcludeForm";
import { ThreadPageForms } from "./ThreadPageForms";
import { ThreadPageFormMessage } from "./ThreadPageFormMessage";
import { isUserIdExist } from "../utility/UserUtility";
import { Link } from "react-router-dom";

export const Thread = createContext(null);
export const LoadThread = createContext(()=>{});

export const ThreadPage = (props) => {

    const loginUser = useContext(LoginedUser);

    const [thread , setThread] = useState(null);

    const loadThread = ()=>{
        api.get(`/thread/${props.match.params.id}`)
        .then(res => {
            //console.log(res.data);
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

    return<div className = "container" style={{paddingBottom : "350px"}}>
        {thread !== null &&
            <div>

                <div style={{position : "fixed"
                ,right : "20px",top : "125px", zIndex : 1 }}>
                    <ToBottomButton/>
                </div>

                {!thread.closed &&
                    <div style={{position : "fixed"
                    ,left : "20px",top : "125px", zIndex : 1 }}>
                        <ReloadButton func = {loadThread}/>
                    </div>
                }
                
                <Thread.Provider value={thread}>
                    <LoadThread.Provider value={loadThread}>
                        <ThreadInfo/>
                        <div className="container w-100 fixed-bottom p-3" style={{backgroundColor : "lemonchiffon"}}>
                          
                            {!thread.closed && loginUser === null &&
                                <ThreadPageFormMessage message={<span><Link to="/login">ログイン</Link>してください。</span>}/> 
                            }

                            {thread.closed && <ThreadPageFormMessage message={<span>閉廷済みのスレッドです。</span>} color = "text-secondary"/>}

                            {loginUser !== null &&
                            thread.closed && !thread.concluded &&
                            loginUser.userId === thread.user.userId &&
                                <ThreadPageFormMessage message={<strong>陪審員は評決を行ってください。</strong>} color= "text-success"/>
                            }
                            
                            {loginUser !== null&&
                             (!thread.closed || !thread.concluded &&loginUser.userId === thread.user.userId) &&
                                <ThreadPageForms/>
                            }
                            
                        </div>
                    </LoadThread.Provider>
                </Thread.Provider>
            </div>
        }
    </div>
}

