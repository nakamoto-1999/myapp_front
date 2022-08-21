import { useContext, useState } from "react";
import { BiSend } from "react-icons/bi";
import { animateScroll } from "react-scroll";
import { api } from "../api";
import { LoginedUser } from "../App";
import { ReloadFunc } from "../context";

 function PostCreateForm(props){

    //フォームデータ
    const [content , setContent] = useState("");

    const reloadThread = useContext(ReloadFunc);

    const loginUser = useContext(LoginedUser);

    const changeContent = (e)=>{
        e.preventDefault();
        setContent(e.target.value);
    }

    const submit = (e)=>{
        e.preventDefault();
        api.post(`/auth/thread/${props.thread.threadId}/post/create`,{content : content})
        .then(res => {
            setContent("");
            reloadThread();
            animateScroll.scrollToBottom();
        })
        .catch(err => {
            window.alert("レスの投稿に失敗しました。");
        });
    }

    return<div>
        <form className="form">
                <div className="form-group">
                    <textarea id="content" className="form-control" onChange={changeContent}
                        style={{minHeight : "120px"}} value={content} 
                        disabled={loginUser !== null && !loginUser.permitted}
                    />
                </div>
                <button className="btn btn-primary w-25" onClick={submit} 
                    style={{minHeight : "40px"}} disabled={content === ""}>
                    <BiSend size={25}/>
                </button>
        </form>
    </div>;
}

export default PostCreateForm;