import {BsArrowCounterclockwise, BsPlus } from "react-icons/bs";

const ReloadButton = (props)=>{
    return<button className="rounded-circle btn btn-secondary p-2"
    onClick={props.func}>
        <BsArrowCounterclockwise size={30}/>
    </button>
}

export default ReloadButton;