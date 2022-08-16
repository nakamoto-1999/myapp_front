import { NoAuthorization } from "./NoAuthorization";
import UserForm from "./UserForm";

const UserCreateForm = ()=>{
    return<div className="container w-75 bg-light p-3">
        <NoAuthorization redirect = "/"/>
        <h2 className="text-center text-secondary">新規登録</h2>
        <UserForm 
            submitUrl={"/user/create"}
            httpMethod = {"POST"}
        />
    </div>
}

export default UserCreateForm;