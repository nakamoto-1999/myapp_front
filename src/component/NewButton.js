import {BsPlus } from "react-icons/bs";

const NewButton = (props)=>{
    return<button className="rounded btn btn-primary p-2" disabled={props.disabled}>
        <BsPlus size={30}/>
    </button>
}

export default NewButton;