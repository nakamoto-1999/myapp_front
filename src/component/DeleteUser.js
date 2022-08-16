import { useEffect, useRef, useState } from "react"
import { BiTrash } from "react-icons/bi"
import { api } from "../api";
import {logout} from "../utility/LoginUtility.ts"

export const DeleteUser = (props) => {

    const deleteUser = (e)=>{
        e.preventDefault();
        api.delete(`/auth/user/${props.userId}/delete`)
        .then(res=>{
            logout();
        });
    }

    return<span onClick={deleteUser}>
        <BiTrash/>削除
    </span>
}