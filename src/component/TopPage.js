
import { ThreadSearchForm } from "./ThreadSearchForm"
import ThreadSelect from "./ThreadSelect"


export const TopPage = ()=>{
    return<div className="p-2 container bg-light">
        <ThreadSearchForm/>
        <ThreadSelect/>
    </div>
} 