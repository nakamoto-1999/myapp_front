import { useContext } from "react"
import { BiBlock } from "react-icons/bi";
import { BsLockFill, BsShieldLockFill } from "react-icons/bs";
import { api } from "../api";
import { LoadUsers, ReloadFunc } from "../context";

export const UserPermitButton = (props) =>{

    const loadUsers = useContext(ReloadFunc);

    const switchUserPermit = (e)=>{
        e.preventDefault();
        api.put(`/auth/admin/user/${props.user.userId}/switch-permit`)
        .then(res => {
            loadUsers();
        })
    }

    return<button className="btn btn-danger w-15" 
    style={{"opacity" : props.user.permitted? 1.0 : 0.5}} onClick={switchUserPermit}>
        <BiBlock size={23}/>
    </button>
}