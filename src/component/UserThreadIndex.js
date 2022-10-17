import { useContext, useEffect, useState } from "react"
import { api } from "../api";
import { LoginedUser } from "../App";
import { Authorization } from "./Authorization";
import { AuthUserMatcher } from "./AuthUserMatcher";
import { H } from "./H";
import ThreadIndex from "./ThreadIndex";
import { Threads } from "./ThreadSelect";


export const UserThreadIndex = (props) => {

    const loginUser = useContext(LoginedUser);

    const [threads , setThreads] = useState([]);
    const [user , setUser] = useState(null);
    
    
    useEffect(()=> {
        api.get(`/auth/user/${props.match.params.id}`)
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            window.location.replace("/");
        });
    } ,[]);

    useEffect(()=> {
        api.get(`/auth/user/${props.match.params.id}/thread`)
            .then(res => {
                setThreads(res.data);
            })
            .catch(err => {
                window.location.replace("/");
            })
    },[])

    return<div className="p-2 container bg-light">
        <Authorization redirect = "/"/>
        {user !== null && 
            <div>
                <AuthUserMatcher userId = {user.userId} redirect = "/"/>
                <H content = {`"${user.name}"さんのスレッド一覧`}/>
                <Threads.Provider value={threads}>
                    <ThreadIndex/>
                </Threads.Provider>
            </div>
        }
    </div>
}