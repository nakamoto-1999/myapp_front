import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import useInterval from "use-interval";
import { api } from "../api";
import { LoginedUser } from "../App";
import DeleteButton from "./DeleteButton";
import Post from "./Post";

const ThreadInfo = (props)=>{

    const loginUser = useContext(LoginedUser);

    const deleteThread = ()=>{
        api.delete(`/auth/thread/${props.thread.threadId}/delete`)
        .then(res => {
            window.location.replace("/");
        })
        .catch(err => {
            window.alert("エラーが発生しました。");
        });
    }

    return<div style={{"whiteSpace" : "pre-wrap"}}>
        {props.thread !== null &&
            <div>
                <div className="p-3 rounded" style={{backgroundColor : "lavender" , minHeight : "100px" , marginBottom : "10px"}}>
                    
                    <div className="text-secondary" style={{marginBottom : "25px"}}>
                        <span>
                            {loginUser !== null && loginUser.role.name === "ADMIN" ?
                                <Link to = {`/admin/user/${props.thread.user.userId}`}>
                                    {props.thread.user.name}
                                </Link>
                            :
                                props.thread.user.name
                            }
                        </span>
                        &emsp;
                        <span>{props.thread.createdAt}</span>
                        &emsp;
                        {loginUser !== null &&
                        (loginUser.role.name === "ADMIN" || loginUser.userId === props.thread.user.userId)&&
                            <DeleteButton onClick = {deleteThread}/>
                        }
                    </div>
                    
                    <div style={{lineHeight : "30px" , letterSpacing : "2px"}}>
                        <strong>{props.thread.overview}</strong>
                    </div>
                </div>

                {
                    props.thread.posts.map((post , index)=>{
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