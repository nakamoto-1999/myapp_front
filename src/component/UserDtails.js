import { useEffect, useState } from "react"
import { api } from "../api";
import { LoadUsers, ReloadFunc } from "../context";
import { UserTable } from "./UserTable";


export const UserDtails = (props) => {

    const [users , setUsers] = useState([]);

    const loadUsers = () => {
        api.get(`/user/${props.match.params.id}`)
        .then(res => {
            setUsers([res.data]);
        });
    }

    useEffect(()=>{
        loadUsers();
    } ,[]);

    return<div>
        <ReloadFunc.Provider value={loadUsers}>
            <UserTable users={users}/>
        </ReloadFunc.Provider>
    </div>
}