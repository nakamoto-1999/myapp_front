
import { useHistory } from "react-router-dom";
import { animateScroll } from "react-scroll";
import Link from "react-scroll/modules/components/Link";


const SquareButton = (props)=>{

    return<button className={`btn btn-${props.color} btn-${props.size} w-${props.w}`}
     onClick={props.onClick}>
        <strong>
            {props.value}
        </strong>
    </button>;
}

export default SquareButton;