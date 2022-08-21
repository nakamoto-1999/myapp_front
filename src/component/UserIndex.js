import { useEffect, useState } from "react"
import { api } from "../api";
import { LoadUsers, ReloadFunc } from "../context";
import { Authorization } from "./Authorization"
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
        <h1 className="text-center">ユーザー一覧</h1>
        <ReloadFunc.Provider value = {loadUsers}>
            {console.log(users)}
            <UserTable users = {users}/>
        </ReloadFunc.Provider>
    </div>

}