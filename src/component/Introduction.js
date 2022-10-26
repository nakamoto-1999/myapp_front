import useCollapse from "react-collapsed"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import { H } from "./H"

export const Introduction = (props) => {

    const {getCollapseProps ,getToggleProps ,isExpanded} = useCollapse();

    return<div style={{marginBottom : "32px"}}>
        <div style={{marginBottom : "16px"}}>
            <H content = "訴訟ごっこ.netへようこそ！"/>
        </div>

        <section {...getCollapseProps()}>
            <div style={{fontSize : "18px" , lineHeight : "30px"}}>
                <div>
                    <label>（アプリの概要）</label>
                </div>
                <p>
                    「訴訟ごっこ.net」は、裁判を模した<strong>論争特化の掲示板アプリ</strong>です。
                    <br/>ユーザーは、スレッドの議題に対して、<strong style={{color : "red"}}>赤</strong>と<strong style={{color : "blue"}}>青</strong>
                    の立場から主張をぶつけ合います。
                    スレッドを立てた人は、<strong>陪審員</strong>として、論争の行く末を見守りつつ、最終的にどちらの立場を支持するかの<strong>評決</strong>を行ってください。
                    <br/><strong>このアプリは、ネット上で誰かと論戦をしたい方々に、最適な場所を提供する目的で作成されたものです。</strong>
                </p>
                <div>
                    <label>（使用用途）</label>
                </div>
                <p>
                    スレッドを立てたり、レスを投稿するためには、<Link to={"/register"}><strong>アカウント登録</strong></Link>並びに<Link to={"/login"}><strong>ログイン</strong></Link>を行う必要があります。
                    <br/>スレッドは、右下の<strong>+ボタン</strong>から立てることができます。
                    <br/>レスの投稿・評決は、各スレッドの<strong>下方</strong>に設けられた<strong>専用フォーム</strong>から行ってください。
                    <br/><strong>陪審員</strong>は、迷惑ユーザーなどを<strong>スレッド単位でブロック</strong>することが可能です。ブロックされたユーザーは、<strong>当該スレッドへのレスの投稿が制限</strong>されます。
                    <br/>スレッドは、<strong>レス数が1000に到達</strong>したこと、スレッドを立ててから<strong>一定期間が経過</strong>したことを理由に、自動的に<strong>閉廷</strong>されます。<strong>閉廷後は、当該スレッドへのレスの投稿が不可能となりますのでご注意ください。</strong>
                </p>
            </div>
        </section>

        <div className="text-center" style={{marginBottom : "16px"}}>
            <span {...getToggleProps()}>
                {isExpanded ? <BsFillCaretUpFill size={20}/> : <BsFillCaretDownFill size={20}/>}
            </span>
        </div>
        
    </div>
}