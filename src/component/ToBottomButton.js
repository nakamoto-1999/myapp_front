
import { animateScroll } from "react-scroll";
import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";

const ToBottomButton = (props)=>{

    const toBottom = ()=>{
        animateScroll.scrollToBottom();
    }

    return<span>
        <BsArrowDownSquare size={35} onClick={toBottom}/>
    </span>

}

export default ToBottomButton; 