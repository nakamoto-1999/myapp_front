import axios from "axios";
import { useEffect, useState } from "react";
import { Authorization } from "./Authorization";
import { AuthUserMatcher } from "./AuthUserMatcher";
import UserForm from "./UserForm";

const UserEditForm = (props)=>{

    const [user , setUser] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:8080/user/${props.match.params.id}`
         , {withCredentials : true})
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            window.location.replace("/not-found");
        });
    } , []);

    return<div className="container w-75 bg-light p-3">
        <Authorization redirect = "/"/>
        {user !== null &&
            <div>
                <AuthUserMatcher userId = {user.userId} redirect = "/"/>
                <UserForm 
                    submitUrl = {`/auth/user/${user.userId}/update`}
                    httpMethod = "PUT"
                />
            </div>
        }
    </div>
}

export default UserEditForm;