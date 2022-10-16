import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { api } from "../api";
import { LoginedUser } from "../App"
import { ReloadFunc } from "../context";
import DeleteButton from "./DeleteButton";
import { LoadThread, Thread } from "./ThreadPage";


const Post = (props) =>{

    const loginUser = useContext(LoginedUser);

    const thread = useContext(Thread);

    const loadThread = useContext(LoadThread);

    const [post] = useState(props.post);

    const deletePost = (e)=>{
        e.preventDefault();
        api.delete(`/auth/post/${post.postId}/delete`)
        .then(res => {
            loadThread();
        });
    }

    return<div className="bg-light p-3 rounded" style={{minHeight : "100px" , marginBottom : "10px"}}>
    {thread !== null && post !== null &&
        <div>
            <div style={{marginBottom : "25px", 
                color : post.color !== null && post.color.name,
                opacity : 0.7
            }}>
                <span>
                    No.{props.index}
                </span>&emsp;
                <span>
                    {loginUser !== null && loginUser.role.name === "ADMIN" ?
                        <Link to= {`/admin/user/${post.user.userId}`} style={{color : post.color.name}}>
                            {post.user.name}
                        </Link>
                    :
                        post.user.name
                    }
                    {post.color.colorId === 1 && <span>（陪審者）</span> ||
                    post.color.colorId === 2 && <span>（{thread.red}）</span> ||
                    post.color.colorId === 3 && <span>（{thread.blue}）</span>
                    }
                </span>&emsp;
                <span>
                    {post.createdAt}
                </span>&emsp;
                {loginUser !== null &&
                (loginUser.role.name === "ADMIN" || loginUser.userId === post.user.userId)&&
                !thread.closed && !thread.concluded &&
                    <DeleteButton onClick = {deletePost}/>
                }
            </div>
            
            <div style={{lineHeight : "30px" ,letterSpacing : "2px"}}>
                {post.content}
            </div>
        </div>
    }
    </div>
}

export default Post;