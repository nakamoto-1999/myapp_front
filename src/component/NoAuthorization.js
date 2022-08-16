import { useContext } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LoginedUser } from "../App"

//ログイン済みでないか
export const NoAuthorization = (props) => {

    const loginUser = useContext(LoginedUser);

    return<div>
        {loginUser !== null &&
            <Redirect to = {props.redirect}/>
        }
    </div>
}