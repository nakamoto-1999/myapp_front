
import { Link } from "react-router-dom";

const ThreadIndex = (props)=>{

    return<div className="bg-light container p-3">
        <h2 className="text-center">スレッド一覧</h2>
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