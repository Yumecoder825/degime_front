import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useAuthContext} from "../auth/context";

export default function Sidebar() {
    const navigate = useNavigate();
    const { isAdmin, user, setShowLoginModal } = useAuthContext();

    const onClickMenu = (path) => {
        if (user){
            navigate(path);
        } else {
            setShowLoginModal(true)
        }
    }

    return(
        <div
            className="hidden md:flex sidebar fixed left-0 top-0 bottom-0 w-[256px] z-20 bg-white dark:bg-gray-900 flex-col text-white transition-all duration-300 border-none sidebar shadow-[0_35px_40px_-15px_rgba(0,0,0,0.3)]">
            <div
                className="overflow-y-auto overflow-x-hidden flex items-center flex-col justify-between flex-grow">
                <Link to="/dashboard">
                    <div className="logo-side"></div>
                </Link>
                <ul className="text-center gap-5 mt-4 w-full h-full max-md:mt-32 text-[#777] flex-grow">
                    <li className="m-4 text-center pl-[50px]">
                        <div className="cursor-pointer shop bottomLink" onClick={() => navigate("/dashboard")}>
                            <img className="bottomIcon" alt="home" src="/image/home.png"/>
                            <span className="bottomIconContent">トップ</span>
                        </div>
                    </li>
                    <li className="m-4 text-center pl-[50px]">
                        <div className="cursor-pointer setting bottomLink" onClick={() => onClickMenu("/setting")}>
                            <img className="bottomIcon" alt="setting" src="/image/setting.png"/>
                            <span className="bottomIconContent">設定</span>
                        </div>
                    </li>
                    <li className="m-4 text-center pl-[50px]">
                        <div className="cursor-pointer data bottomLink"  onClick={() => onClickMenu("/data")}>
                            <img className="bottomIcon" alt="data" src="/image/data.png"/>
                            <span className="bottomIconContent">データ管理</span>
                        </div>
                    </li>
                    <li className="m-4 text-center pl-[50px]">
                        <div className="cursor-pointer contactManageBottom bottomLink"  onClick={() => onClickMenu("/contact")}>
                            <img className="bottomIcon" alt="contact" src="/image/contact.png"/>
                            <span className="bottomIconContent">名刺管理</span>
                        </div>
                    </li>
                    <li className="m-4 text-center pl-[50px]">
                        <div className="cursor-pointer chat bottomLink"  onClick={() => onClickMenu("/chat/list")}>
                            <img className="bottomIcon" alt="chat" src="/image/chat.png"/>
                            <span className="bottomIconContent">チャット</span>
                        </div>
                    </li>
                    <li className="m-4 text-center pl-[50px]">
                        <div className="cursor-pointer shop bottomLink" onClick={() => onClickMenu("/shop")}>
                            <img className="bottomIcon" alt="shop" src="/image/shop.png"/>
                            <span className="bottomIconContent">ショップ</span>
                        </div>
                    </li>
                </ul>
                {isAdmin && (
                    <ul className="text-center gap-5 mt-4 w-full h-full max-md:mt-32 text-[#777]">
                        <li className="m-4 text-center pl-[50px]">
                            <a className="admin bottomLink" href="/admin">
                                <svg
                                    fill="#9170ff"
                                    className="bottomIcon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    enableBackground="new 0 0 24 24"
                                >
                                    <g id="user-admin">
                                        <path
                                            d="M22.3,16.7l1.4-1.4L20,11.6l-5.8,5.8c-0.5-0.3-1.1-0.4-1.7-0.4C10.6,17,9,18.6,9,20.5s1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5
                        c0-0.6-0.2-1.2-0.4-1.7l1.9-1.9l2.3,2.3l1.4-1.4l-2.3-2.3l1.1-1.1L22.3,16.7z M12.5,22c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5
                        s1.5,0.7,1.5,1.5S13.3,22,12.5,22z"
                                        />
                                        <path
                                            d="M2,19c0-3.9,3.1-7,7-7c2,0,3.9,0.9,5.3,2.4l1.5-1.3c-0.9-1-1.9-1.8-3.1-2.3C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6
                        S3,2.7,3,6c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h8v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"
                                        />
                                    </g>
                                </svg>
                                <span className="bottomIconContent">アドミン</span>
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}