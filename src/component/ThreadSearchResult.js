import { useEffect, useState } from "react"
import { api } from "../api"
import { H } from "./H";
import ThreadIndex from "./ThreadIndex";
import { Threads } from "./ThreadSelect";


export const ThreadSearchResult = (props)=>{

    const [threads , setThreads] = useState([]);

    useEffect(() => {
        console.log(`/thread/search?keyword=${props.match.params.keyword}`);
        api.get(`/thread/search?keyword=${props.match.params.keyword}`)
        .then(res => {
            setThreads(res.data);
        })
        .catch(err => {
            window.location.replace("/");
        })
    });

    return<div className="p-2 container bg-light">
        <H content = {`"${props.match.params.keyword}"の検索結果`}/>
        <Threads.Provider value={threads}>
            <ThreadIndex/>
        </Threads.Provider>
    </div>
}