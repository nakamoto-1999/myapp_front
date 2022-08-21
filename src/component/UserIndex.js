import { useEffect, useState } from "react"
import { api } from "../api";
import { LoadUsers, ReloadFunc } from "../context";
import { Authorization } from "./Authorization"
import { H } from "./H";
import { UserTable } from "./UserTable";

export const UserIndex = (props)=>{

    const [users , setUsers] = useState([]);

    const loadUsers = () => {
        api.get("/auth/admin/user")
        .then(res => {
            setUsers(res.data);
        });
    }

    useEffect(()=>{
        loadUsers();
    } , []);

    return<div>
        <H content={"ユーザー一覧"}/>
        <ReloadFunc.Provider value = {loadUsers}>
            {console.log(users)}
            <UserTable users = {users}/>
        </ReloadFunc.Provider>
    </div>

}