import { useContext } from "react"
import useCollapse from "react-collapsed";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { LoginedUser } from "../App";
import PostCreateForm from "./PostCreateForm";
import { ThreadConcludeForm } from "./ThreadConcludeForm";
import { Thread } from "./ThreadPage";

export const ThreadPageForms = (props) => {

    const loginUser = useContext(LoginedUser);
    const thread = useContext(Thread);

    const {getCollapseProps , getToggleProps , isExpanded} = useCollapse();

    return<div>
        {loginUser !==null && thread !== null &&
            <div>
                <div className="text-center">
                    <span {...getToggleProps()}>
                        {isExpanded ? <BsFillCaretDownFill size={18}/> : <BsFillCaretUpFill size={18}/>}
                    </span>
                </div>
                <section {...getCollapseProps()}>
                    <div className="overflow-auto" style={{maxHeight : "190px"}}>
                        {!thread.closed && 
                            <div style={{marginBottom : "12px"}}>
                                <PostCreateForm/>
                            </div>
                        }
                        {!thread.concluded && loginUser.userId === thread.user.userId &&
                            <ThreadConcludeForm/>
                        }
                    </div>
                </section>
            </div>
        }
    </div>

}