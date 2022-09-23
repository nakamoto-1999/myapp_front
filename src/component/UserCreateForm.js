import { H } from "./H";
import { NoAuthorization } from "./NoAuthorization";
import UserForm from "./UserForm";

const UserCreateForm = ()=>{
    return<div className="container w-100 bg-light p-3">
        <NoAuthorization redirect = "/"/>
        <H content={"Register"}/>
        <UserForm 
            submitUrl={"/user/create"}
            httpMethod = {"POST"}
        />
    </div>
}

export default UserCreateForm;