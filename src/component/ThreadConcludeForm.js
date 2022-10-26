import { useContext, useState } from "react"
import useCollapse from "react-collapsed";
import { BiMenu } from "react-icons/bi";
import { BsFillCaretDownFill, BsFillCaretUpFill, BsList, BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { api } from "../api";
import { LoginedUser } from "../App";
import { LoadThread, Thread } from "./ThreadPage";

export const ThreadConcludeForm = (props) => {

    const history = useHistory();

    const loginUser = useContext(LoginedUser);
    const thread = useContext(Thread);
    const loadThread = useContext(LoadThread);

    const [reason , setReason] = useState("");
    const [colorId , setColorId] = useState(2);

    const changeReason = (e) =>{
        e.preventDefault();
        setReason(e.target.value);
    }

    const changeColorId = (e)=>{
        e.preventDefault();
        setColorId(e.target.value);
    }

    const submit = (e)=>{
        e.preventDefault();
        api.put(`/auth/thread/${thread.threadId}/conclude` , 
        {concludedColorId : colorId , conclusionReason : reason})
        .then(res => {
            //history.push("/");
            loadThread();
        })
        .catch(err=> {
            window.alert(err);
        } );
    }
 
    return<div>
        {loginUser !== null && thread !== null &&
            <div>
                <form className="form">
                    <div className="form-group">
                        <label>評決</label>
                        <select className="form-control" onChange={changeColorId}>
                            <option className="bg-danger" value={2}>赤</option>
                            <option className="bg-primary" value={3}>青</option>
                        </select>
                        <label>評決に至った理由（任意）</label>
                        <textarea id="content" className="form-control" onChange={changeReason}
                                style={{minHeight : "90px"}} value = {reason}
                        />
                    </div>
                    <button className="btn btn-danger w-25" onClick={submit} 
                        style={{minHeight : "40px"}}>
                        評決
                    </button>
                </form>
            </div>
        }
    </div>
}