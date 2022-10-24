import { useState } from "react";
import useCollapse from "react-collapsed";
import { BsList, BsSearch, BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { api } from "../api";

export const ThreadSearchForm = (props)=>{

    const history = useHistory();

    const [keyword , setKeyword] = useState("");

    const changeKeyword = (e)=>{
        e.preventDefault();
        setKeyword(e.target.value);
    }

    const submit = (e)=>{
        e.preventDefault();
        console.log(`/thread/search/${keyword}`);
        history.push(`/thread/search/${keyword}`);
    }
    
    const {getCollapseProps , getToggleProps , isExpanded} = useCollapse();

    return<div>
        
        <div className="text-center">
            <span {...getToggleProps()}>
                {isExpanded ? <BsX size={25}/> : <BsList size={25}/>}
            </span>
        </div>

        <section {...getCollapseProps()}>
            <form style={{marginTop : "3px"}} className="form-inline justify-content-center">
                <div className="form-group">
                    <input className="form-control" onChange={changeKeyword} value={keyword}
                    placeholder="スレッド検索"/>
                </div>
                <div className="form-group">
                    <button className="form-control btn btn-primary" onClick={submit}
                    disabled={keyword === ""}>
                        <BsSearch/>
                    </button>
                </div>
            </form>
        </section>

    </div>
}