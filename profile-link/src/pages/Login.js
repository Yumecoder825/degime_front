import React from "react";
import "../pages/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
    return(
        <div className="login mx-8">
            <div alt="logo" className="logo"></div>
            <div className="text-center text-[22px] font-medium mt-[20px]">ログイン</div>
            <div className="font-semibold mt-[60px]">アカウント登録がお済みでない方は、<Link to="/register" className="text-blue-500 underline">こちら</Link>から新規登録できます</div>
            <form className="loginMainInfo mt-[70px]" action="">
                <label className="font-medium text-zinc-400">Eメール</label>
                <div className="flex items-center">
                    <img alt="mail" src="/image/email.png" className=" w-4 h-fit"></img>
                    <input type="email" className="w-full ml-3 focus:outline-none focus:border-none text-black peer-[1]: placeholder-slate-900 placeholder:font-medium" placeholder="ユーザー名かメールアドレスを入力してください"></input>
                </div>
                <div className="w-full h-[2px] bg-neutral-400 mt-1 peer-[1]-focused:bg-slate-900"></div>
                <label className="mt-[60px] font-medium text-zinc-400">パスワード</label>
                <div className="flex items-center">
                    <img alt="password" src="/image/password.png" className=" w-4 h-fit"></img>
                    <input type="password" className="w-full ml-3 focus:outline-none focus:border-none text-black placeholder-slate-900 placeholder:font-medium" placeholder="パスワードを入力してください"></input>
                    <img alt="eye" src="/image/eye.png" className=" w-4 h-fit"></img>
                </div>
                <div className="w-full h-[2px] bg-neutral-400 mt-1"></div>
                <Link className="fogetPassword float-right mr-2 mt-3" to="/">パスワードを忘れた方</Link>
                <input type="submit" value='ログイン' className="w-full text-white  bg-sky-400 py-3 rounded-full text-base mt-16"></input>
            </form>
            <div className="socialLinks flex w-60 mt-[60px] mx-auto justify-between">
                <img className="faceBook w-10 h-fit" alt="facebook" src="/image/facebook.png"></img>
                <img className="apple w-10 h-fit" alt="apple" src="/image/apple.png"></img>
                <img className="google w-10 h-fit" alt="google" src="/image/google.png"></img>
            </div>
        </div>
    );
};

export default Login;