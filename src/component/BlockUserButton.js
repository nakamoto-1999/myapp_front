import { useContext, useState } from "react";
import { BiBlock, BiLock } from "react-icons/bi";
import { api } from "../api";
import { isUserIdExist } from "../utility/UserUtility";
import { LoadThread, Thread } from "./ThreadPage";

export const BlockUserButton = (props) => {

    const thread = useContext(Thread);
    const loadThread = useContext(LoadThread);

    const [postUser] = useState(props.user)

    const blockUser = (e)=>{
        e.preventDefault();
        thread !== null && postUser !== null &&
        api.post(`/auth/thread/${thread.threadId}/user/${postUser.userId}/block`)
        .then(err => {
            loadThread();
        })
        .catch(err => {
            window.alert("エラーが発生しました。");
        });
    }

    const unblockUser = (e) => {
        e.preventDefault();
        thread !== null && postUser !== null &&
        api.delete(`/auth/thread/${thread.threadId}/user/${postUser.userId}/unblock`)
        .then(err => {
            loadThread();
        })
        .catch(err => {
            window.alert("エラーが発生しました。");
        });
    }

    return<span>
        {console.log(isUserIdExist(thread.blockedUsers , postUser.userId))}
        {thread !== null && postUser !== null &&
            <button className="btn btn-danger"
                onClick={!isUserIdExist(thread.blockedUsers , postUser.userId)? blockUser : unblockUser  }
                style={{opacity : !isUserIdExist(thread.blockedUsers , postUser.userId)? 1.0 : 0.5}}
            >
                <BiBlock size={15}/>
            </button>
        }
    </span>
}