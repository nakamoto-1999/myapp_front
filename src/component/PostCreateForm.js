import { useContext, useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { animateScroll } from "react-scroll";
import { api } from "../api";
import { LoginedUser } from "../App";
import { ReloadFunc } from "../context";
import { isUserIdExist } from "../utility/UserUtility";
import { LoadThread, Thread } from "./ThreadPage";
import { ThreadPageFormMessage } from "./ThreadPageFormMessage";

 function PostCreateForm(props){

    const loginUser = useContext(LoginedUser);
    const thread = useContext(Thread);
    const loadThread = useContext(LoadThread);

    //フォームデータ
    const [content , setContent] = useState("");
    const [colorId , setColorId] = useState();

    useEffect(() => {
        thread !== null && loginUser !== null &&
        thread.user.userId === loginUser.userId ?
            setColorId(1)
        :
            setColorId(2)
    } , [])

    const changeContent = (e)=>{
        e.preventDefault();
        setContent(e.target.value);
    }

    const changeColorId = (e) => {
        e.preventDefault();
        setColorId(e.target.value);
    }

    const submit = (e)=>{
        e.preventDefault();
        api.post(`/auth/thread/${thread.threadId}/post/create`,{colorId : colorId ,content : content})
        .then(res => {
            setContent("");
            loadThread();
            animateScroll.scrollToBottom();
        })
        .catch(err => {
            window.alert("レスの投稿に失敗しました。");
        });
    }

    return<div>
    {thread !== null && loginUser !== null &&
        <div>
            {isUserIdExist(thread.blockedUsers , loginUser.userId) &&   
                <ThreadPageFormMessage message = {<strong>陪審員によってブロックされています。</strong>} color="text-danger"/>
            }
            <form className="form">
                    <div className="form-group">
                        <label>レスの投稿</label>
                        {thread.user.userId !== loginUser.userId &&
                            <select className="form-control" onChange={changeColorId}
                                disabled={!loginUser.permitted ||isUserIdExist(thread.blockedUsers , loginUser.userId)}
                            >
                                <option className="bg-danger" value={2}>{thread.red}</option>
                                <option className="bg-primary" value={3}>{thread.blue}</option>
                            </select>
                        }
                        <textarea id="content" className="form-control" onChange={changeContent}
                            style={{minHeight : "90px"}} value={content}
                            disabled={!loginUser.permitted ||isUserIdExist(thread.blockedUsers , loginUser.userId)}
                        />
                    </div>
                    <button className="btn btn-primary w-25" onClick={submit} 
                        style={{minHeight : "40px"}} disabled={content === ""}>
                        <BiSend size={25}/>
                    </button>
            </form>
        </div>
    }
    </div>
}

export default PostCreateForm;