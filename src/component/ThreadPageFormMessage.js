
export const ThreadPageFormMessage = (props) => {
    return<div className={`bg-light ${props.color} text-center p-1`}
    style={{fontSize : "18px"}}>
        {props.message}
    </div>
}