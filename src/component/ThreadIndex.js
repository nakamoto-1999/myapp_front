
import { Link } from "react-router-dom";
import { H } from "./H";

const ThreadIndex = (props)=>{

    return<div className="bg-light container p-3">
        <H content={"スレッド一覧"}/>
        {
            props.threads.map((thread)=>{
                if(thread.valid)
                    return<div className="p-2 position-relative" style={{minHeight : "100px", borderTop : "1px solid silver"}}> 
                        <div>
                            <strong style={{"fontSize" : "20px"}}>
                                {thread.title.length > 20 ?
                                    <span>
                                        {thread.title.slice( 0, 20 )}...
                                    </span>
                                    :
                                        thread.title
                                }
                            </strong>
                            &ensp;&ensp;&ensp;
                            <span>
                                by {thread.user.name}
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