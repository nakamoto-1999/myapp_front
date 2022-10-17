import { useState } from "react";
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
    

    return<div>
        <form className="form-inline">
            <div className="form-group">
                <input className="form-control" onChange={changeKeyword} value={keyword}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" onClick={submit}
                disabled={keyword === ""}>
                    検索
                </button>
            </div>
        </form>
    </div>
}