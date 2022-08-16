import { useContext } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { LoginedUser } from "../App";

export const AuthUserMatcher = (props) => {

    const loginUser = useContext(LoginedUser);

    return<div>
        {loginUser !== null && loginUser.userId !== props.userId &&
            <Redirect to = {props.redirect}/>
        }
    </div>
}