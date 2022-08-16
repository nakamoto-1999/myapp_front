import { useContext } from "react"
import { Link } from "react-router-dom";
import { api } from "../api";
import { LoginedUser } from "../App"
import { ReloadFunc } from "../context";
import DeleteButton from "./DeleteButton";


const Post = (props) =>{

    const loginUser = useContext(LoginedUser);

    const reloadThread = useContext(ReloadFunc)

    const deletePost = (e)=>{
        e.preventDefault();
        api.delete(`/auth/post/${props.post.postId}/delete`)
        .then(res => {
            reloadThread();
        });
    }

    return<div className="bg-light p-3 rounded" style={{minHeight : "100px" , marginBottom : "10px"}}>

        <div className="text-secondary" style={{marginBottom : "25px"}}>
        
            <span>
                No.{props.index}
            </span>&emsp;

            <span>
                {loginUser !== null && loginUser.role.name === "ADMIN" ?
                    <Link to= {`/admin/user/${props.post.user.userId}`}>
                        {props.post.user.name}
                    </Link>
                :
                    props.post.user.name
                }
            </span>&emsp;

            <span>
                {props.post.createdAt}
            </span>&emsp;

            {loginUser !== null &&
            (loginUser.role.name === "ADMIN" || loginUser.userId === props.post.user.userId)&&
                <DeleteButton onClick = {deletePost}/>
            }

        </div>
        
        <div style={{lineHeight : "30px" ,letterSpacing : "2px"}}>
            <strong>
                {props.post.content}
            </strong>
        </div>

    </div>
}

export default Post;