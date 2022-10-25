import { api } from "../api";
import { login } from "../utility/LoginUtility.ts";

export const TestLoginButton = (props) => {

    const onClick = (e)=>{
        e.preventDefault();
        login(
            process.env.REACT_APP_TEST_USER_EMAIL || "test@localhost.com" , 
            process.env.REACT_APP_TEST_USER_PSWD || "abcd7771"
        );
    }

    return<button className="btn btn-lg btn-info"
    onClick={onClick}>
        <strong>テストユーザーでログイン</strong>
    </button>
}