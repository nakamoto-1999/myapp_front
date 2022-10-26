import useCollapse from "react-collapsed"
import { Link } from "react-router-dom"
import { H } from "./H"

export const Introduction = (props) => {

    const {getCollapseProps ,getToggleProps ,isExpanded} = useCollapse();

    return<div>
        <div style={{marginBottom : "16px"}}>
            <H content = "訴訟ごっこ.netへようこそ"/>
        </div>
        <div>
            <label>（アプリの概要）</label>
        </div>
        <p style={{fontSize : "18px" , lineHeight : "30px"}}>
            「訴訟ごっこ.net」は、裁判を模した<strong>論争特化</strong>の掲示板アプリです。
            <br/>ユーザーは、スレッドの議題に対して、<strong style={{color : "red"}}>赤</strong>と<strong style={{color : "blue"}}>青</strong>
            の立場から主張をぶつけ合います。
            スレッドを立てた人は、<strong>陪審員</strong>として、論争の行く末を見守りつつ、最終的にどちらの立場を支持するかの<strong>評決</strong>を行ってください。
        </p>
        <div>
            <label>（使用用途）</label>
        </div>
        <p style={{fontSize : "18px" , lineHeight : "30px"}}>
            スレッドを立てたり、レスを投稿するためには、<Link to={"/register"}><strong>アカウント登録</strong></Link>並びに<Link to={"/login"}><strong>ログイン</strong></Link>を行う必要があります。
            <br/>スレッドは、右下の<strong>+ボタン</strong>から立てることができます。
            <br/>レスの投稿・評決は、各スレッドの<strong>下方</strong>に設けられた<strong>専用フォーム</strong>から行ってください。
            <br/>スレッドの<strong>陪審員</strong>となったユーザーは、迷惑ユーザーなどをスレッド単位で<strong>ブロック</strong>することが可能です。ブロックされたユーザーは、<strong>当該スレッドへのレスの投稿が制限</strong>されます。
            <br/>スレッドは、<strong>レス数が1000に到達</strong>したこと、スレッドを立ててから<strong>一定期間が経過</strong>したことを理由に、自動的に<strong>閉廷</strong>されます。閉廷後は、<strong>当該スレッドへのレスの投稿が不可能となりますのでご注意ください。</strong>
        </p>
    </div>
}