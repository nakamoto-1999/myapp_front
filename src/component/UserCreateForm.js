import { H } from "./H";
import { NoAuthorization } from "./NoAuthorization";
import UserForm from "./UserForm";

const UserCreateForm = ()=>{
    return<div className="container w-75 bg-light p-3">
        <NoAuthorization redirect = "/"/>
        <H content={"新規登録"}/>
        <UserForm 
            submitUrl={"/user/create"}
            httpMethod = {"POST"}
        />
    </div>
}

export default UserCreateForm;