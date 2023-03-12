import { useContext } from "react";
import useCollapse from "react-collapsed"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import { LoginedUser } from "../App";
import { H } from "./H"
import SquareButton from "./SquareButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { loginWithTest } from "../utility/LoginUtility.ts";

export const Introduction = (props) => {

    const loginUser = useContext(LoginedUser);

    const {getCollapseProps ,getToggleProps ,isExpanded} = useCollapse();

    const history = useHistory();

    const toLogin = (e) => {
        e.preventDefault();
        history.push("/login");
    }

    const toRegister = (e) => {
        e.preventDefault();
        history.push("/register");
    }

    return<div style={{marginBottom : "32px"}}>
        <div style={{marginBottom : "32px"}}>
            <H content = "訴訟ごっこへようこそ！"/>
        </div>

        {!loginUser && 
            <div className="text-center" style={{marginBottom : "32px"}}>
                <div style={{marginBottom : "16px"}}>
                    <SquareButton value = "登録" color = "success" size = "lg"
                    w = "75" onClick = {toRegister}/>
                </div>
                <div style={{marginBottom : "16px"}}>
                    <SquareButton value = "ログイン" color = "primary" size = "lg"
                    w = "75" onClick = {toLogin}/>
                </div>
                <div style={{marginBottom : "16px"}}>
                    <SquareButton value = "テストユーザー" color = "info" size = "lg"
                    w = "75" onClick = {loginWithTest}/>
                </div>
            </div>
        }

        <section {...getCollapseProps()}>
            <div style={{fontSize : "18px" , lineHeight : "30px"}}>
                <ul>
                    <li style={{marginBottom : "30px"}}>
                        <strong>「訴訟ごっこ」</strong>は、<strong>ディベート</strong>に特化した
                        <strong>模擬裁判型</strong>掲示板サイトです。
                    </li>
                    <li style={{marginBottom : "30px"}}>
                        各スレッドの議題や論点に従って、<strong style={{color:"red"}}>赤</strong>・<strong style={{color:"blue"}}>青</strong>
                        いずれかの立場から意見を返信してください。
                    </li>
                    <li style={{marginBottom : "30px"}}>
                        スレッド主は、その他ユーザーによるレスのやり取りについて、<strong>自由な心証に基づき</strong>、<strong style={{color:"red"}}>赤</strong>・<strong style={{color:"blue"}}>青</strong>
                        いずれかの評決を下すことができます。
                    </li>
                    <li style={{marginBottom : "30px"}}>
                        スレッドを立てたり、レスを投稿するためには、<Link to={"/register"}><strong>アカウント登録</strong></Link>
                        並びに<Link to={"/login"}><strong>ログイン</strong></Link>を行う必要があります。
                    </li>
                    <li style={{marginBottom : "30px"}}>
                        スレッドは、右下の<strong>+ボタン</strong>から立てることができます。
                    </li>
                    <li style={{marginBottom : "30px"}}>
                        レスの投稿・評決は、各スレッドの<strong>下方</strong>に設けられたフォームから行ってください。
                    </li>
                    <li style={{marginBottom : "30px"}}>
                        スレッド主は、特定のユーザーをスレッドから<strong>ブロック</strong>して追放することが可能です。
                    </li>
                    <li style={{marginBottom : "30px"}}>
                        スレッドは、レス数が<strong>1000</strong>に到達したこと、スレッドを立ててから<strong>1年</strong>が経過したことを理由に、自動的に<strong>閉廷</strong>されます。
                        <strong>閉廷後は、スレッドへのレスの投稿が不可能となります。</strong>
                    </li>
                </ul>
            </div>
        </section>

        <div className="text-center" style={{marginBottom : "16px"}}>
            <span {...getToggleProps()}>
                {isExpanded ? 
                    <BsFillCaretUpFill size={20}/> 
                    : 
                    <div>
                        <div>(サイトの説明)</div>
                        <div><BsFillCaretDownFill size={20}/></div>
                    </div>
                }
            </span>
        </div>
        
    </div>
}