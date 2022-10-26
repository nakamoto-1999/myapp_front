
import { Introduction } from "./Introduction"
import ThreadSelect from "./ThreadSelect"


export const TopPage = ()=>{
    return<div className="p-3 container bg-light">
        <Introduction/>
        <ThreadSelect/>
    </div>
} 