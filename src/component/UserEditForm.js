import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Authorization } from "./Authorization";
import { AuthUserMatcher } from "./AuthUserMatcher";
import { H } from "./H";
import UserForm from "./UserForm";

const UserEditForm = (props)=>{

    const [user , setUser] = useState(null);

    useEffect(()=>{
        api.get(`/auth/user/${props.match.params.id}`)
        .then(res => {
            //データが有効なものなければ404エラーに遷移
            !res.data.deleted ?
                setUser(res.data)
            :
                window.location.replace("/not-found");
        })
        .catch(err => {
            window.location.replace("/");
        });
    } , []);

    return<div className="container w-100 bg-light p-3">
        <Authorization redirect = "/"/>
        {user !== null &&
            <div>
                <H content={"Edit"}/>
                <AuthUserMatcher userId = {user.userId} redirect = "/"/>
                <UserForm 
                    submitUrl = {`/auth/user/${user.userId}/update`}
                    httpMethod = "PUT"
                    pName = {user.name}
                    pEmail = {user.email}
                />
            </div>
        }
    </div>
}

export default UserEditForm;