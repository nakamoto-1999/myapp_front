import { useState } from "react";

export const useThreadsManager = ()=>{

    const [threads , setThreads , ] = useState();

    return [threads];
}