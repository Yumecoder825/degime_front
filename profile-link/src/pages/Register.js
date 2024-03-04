import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    return(
        <div className="register mx-8">
            <div alt="logo" className="logo"></div>
            <div className="text-center text-[22px] font-semibold mt-[20px]">新規登録</div>
            <div className="font-extrabold mt-[60px]">すでに登録済みの方は、<Link to="/login" className="text-blue-500 underline">こちら</Link>からログインできます</div>
            <form className="loginMainInfo mt-[70px]" action="">
                <label className="font-medium  text-zinc-400">Eメール</label>
                <div className="flex items-center">
                    <img alt="mail" src="/image/email.png" className=" w-4 h-fit"></img>
                    <input type="email" className="w-full ml-3 focus:outline-none focus:border-none text-black peer-[1]: placeholder:text-slate-900 placeholder:font-medium" placeholder="メールアドレスを入力してください"></input>
                </div>
                <div className="w-full h-[2px] bg-neutral-400 mt-1 peer-[1]-focused:bg-slate-900"></div>
                <label className="mt-[60px] font-medium text-zinc-400">ユーザー名(半角英数字４文字以上)</label>
                <div className="flex items-center">
                    <img alt="user" src="/image/user.png" className=" w-4 h-fit"></img>
                    <input type="text" className="w-full ml-3 focus:outline-none focus:border-none text-black peer-[1]: placeholder-slate-900 placeholder:font-medium" placeholder="ユーザー名を入力してください"></input>
                </div>
                <div className="w-full h-[2px] bg-neutral-400 mt-1 peer-[1]-focused:bg-slate-900"></div>
                <label className="mt-[60px] font-medium text-zinc-400">パスワード</label>
                <div className="flex items-center">
                    <img alt="password" src="/image/password.png" className=" w-4 h-fit"></img>
                    <input type="password" className="w-full ml-3 focus:outline-none focus:border-none text-black placeholder-slate-900 placeholder:font-medium" placeholder="半角英数字６文字以上"></input>
                    <img alt="eye" src="/image/eye.png" className=" w-4 h-fit"></img>
                </div>
                <div className="w-full h-[2px] bg-neutral-400 mt-1"></div>
                <label className="mt-[60px] font-medium text-zinc-400">パスワードを再入力してください</label>
                <div className="flex items-center">
                    <img alt="password" src="/image/password.png" className=" w-4 h-fit"></img>
                    <input type="password" className="w-full ml-3 focus:outline-none focus:border-none text-black placeholder-slate-900 placeholder:font-medium" placeholder="パスワード再入力"></input>
                    <img alt="eye" src="/image/eye.png" className=" w-4 h-fit"></img>
                </div>
                <div className="w-full h-[2px] bg-neutral-400 mt-1"></div>
                <div className="w-11/12 mx-auto mt-[20px]">登録すると、<Link to="/" className="text-indigo-600">利用規約・プライバシーポリシーに</Link>同意したとみなします</div>
                <input type="submit" value='新規登録' className="w-full text-white  bg-sky-400 py-3 rounded-full text-base mt-16"></input>
            </form>
            <div className="socialLinks flex w-60 mt-[60px] mx-auto justify-between">
                <img className="faceBook w-10 h-fit" alt="facebook" src="/image/facebook.png"></img>
                <img className="apple w-10 h-fit" alt="apple" src="/image/apple.png"></img>
                <img className="google w-10 h-fit" alt="google" src="/image/google.png"></img>
            </div>
        </div>
    )
}

export default Register;
