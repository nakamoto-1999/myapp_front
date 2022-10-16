import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import useInterval from "use-interval";
import { api } from "../api";
import { LoginedUser } from "../App";
import DeleteButton from "./DeleteButton";
import Post from "./Post";
import { Thread } from "./ThreadPage";

const ThreadInfo = (props)=>{

    const loginUser = useContext(LoginedUser);

    const thread = useContext(Thread);

    const deleteThread = ()=>{
        api.delete(`/auth/thread/${thread.threadId}/delete`)
        .then(res => {
            window.location.replace("/");
        })
        .catch(err => {
            window.alert("エラーが発生しました。");
        });
    }

    return<div style={{"whiteSpace" : "pre-wrap"}}>
        {thread !== null &&
            <div>
                <div className="p-3 rounded bg-light" style={{ minHeight : "100px" , marginBottom : "10px"}}>
                    
                    <div style={{marginBottom : "25px"}}>
                        <span>
                            {loginUser !== null && loginUser.role.name === "ADMIN" ?
                                <Link to = {`/admin/user/${thread.user.userId}`} style={{color : "black" }}>
                                    {thread.user.name}
                                </Link>
                            :
                                thread.user.name
                            }
                        </span>
                        &emsp;
                        <span>{thread.createdAt}</span>
                        &emsp;
                        {loginUser !== null &&
                        (loginUser.role.name === "ADMIN" || loginUser.userId === thread.user.userId)&&
                         !thread.closed && !thread.concluded &&
                            <DeleteButton onClick = {deleteThread}/>
                        }
                    </div>
                    
                    <div style={{lineHeight : "30px" , letterSpacing : "2px"}}>
                        <p>
                            {thread.overview}
                        </p>
                        <p>
                            <strong>{thread.point}</strong>
                        </p>
                        <br/>
                        <p style={{fontSize : "20px"}}>
                            <span style={{color : "red"}}>
                                赤：<strong>{thread.red}</strong>
                            </span>
                            &emsp;
                            <span style={{color : "blue"}}>
                                青：<strong>{thread.blue}</strong>
                            </span>
                        </p>
                    </div>
                </div>

                {thread.posts.map((post , index)=>{
                        if(!post.deleted){
                            return <Post post = {post} index = {index + 1}/>;
                        }
                    })
                }
            </div>
        }
    </div>;
}

export default ThreadInfo;