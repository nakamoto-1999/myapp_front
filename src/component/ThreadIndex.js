
import { useContext } from "react";
import { Link } from "react-router-dom";
import { H } from "./H";
import { Threads } from "./ThreadSelect";

const ThreadIndex = (props)=>{

    const threads = useContext(Threads);

    return<div className="bg-light container">
        {
            threads.map((thread)=>{
                if(!thread.deleted)
                    return<div className="position-relative" style={{minHeight : "100px", borderTop : "1px solid silver"}}> 
                        <div>
                            <strong style={{"fontSize" : "20px"}}>
                                {thread.overview.length > 20 ?
                                    <span>
                                        {thread.overview.slice( 0, 20 )}...
                                    </span>
                                    :
                                        thread.overview
                                }
                            </strong>
                            &ensp;&ensp;&ensp;
                            <span>
                                by {thread.user.name}
                            </span>
                            &emsp;
                            <span>
                                {thread.concluded && thread.concludedColor !== null&&
                                    <strong style={{color : thread.concludedColor.name,fontSize : "16px"}}>
                                        評決済み
                                    </strong>
                                }
                            </span>
                        </div>
                        <br/><br/>
                        <div>
                            <span>{thread.createdAt}</span>
                        </div>
                        <Link to={`/thread/${thread.threadId}`} className="stretched-link"/>
                    </div>
            })
        }
    </div>
    

}

export default ThreadIndex;