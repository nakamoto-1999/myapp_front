import { useContext } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { LoginedUser } from "../App"

export const Authorization = (props) => {

    const loginUser = useContext(LoginedUser);

    return<div>
        {console.log(loginUser)}
        {loginUser === null &&
            <Redirect to = {props.redirect}/>
        }
        {props.auth === "ADMIN" &&loginUser !== null && loginUser.role.name !== "ADMIN" &&
            <Redirect to = {props.redirect}/>
        }
    </div>
}