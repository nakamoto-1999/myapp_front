
import { useHistory } from "react-router-dom";
import { animateScroll } from "react-scroll";
import Link from "react-scroll/modules/components/Link";


const SquareButton = (props)=>{

    return<button className={`btn btn-${props.color}`} onClick={props.onClick}>
        {props.value}
    </button>;
}

export default SquareButton;