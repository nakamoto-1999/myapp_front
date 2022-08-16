import { Route, Router } from "react-router-dom/cjs/react-router-dom.min"
import { Authorization } from "./Authorization"
import { UserDtails } from "./UserDtails"
import { UserIndex } from "./UserIndex"

export const Admin = (props) => {
    return<div className="container bg-light p-2">
        <Authorization auth = "ADMIN" redirect = "/"/>
        <Route exact path={"/admin"} component={UserIndex}/>
        <Route path={"/admin/user/:id"} component={UserDtails}/>
    </div>
}