import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { api } from "../api";
import { LoginedUser } from "../App"
import { ReloadFunc } from "../context";
import { BlockUserButton } from "./BlockUserButton";
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
            <div>
                <span style={{marginBottom : "25px", 
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
                        {post.color.colorId === 1 && <span>（スレ主）</span> ||
                        post.color.colorId === 2 && <span>（{thread.red}）</span> ||
                        post.color.colorId === 3 && <span>（{thread.blue}）</span>
                        }
                    </span>&emsp;
                    <span>
                        {post.createdAt}
                    </span>           
                </span>
                &emsp;
                {loginUser !== null && loginUser.role.name === "ADMIN" &&
                    <span>
                        <DeleteButton onClick = {deletePost}/>
                    </span>
                } 
                &emsp;
                {loginUser !== null &&
                    thread.user.userId === loginUser.userId &&
                    thread.user.userId !== post.user.userId &&
                    post.user.role.name !== "ADMIN" &&
                    !thread.closed && !thread.concluded &&
                        <span>
                            <BlockUserButton user = {post.user}/>
                        </span>
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