import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalBody,
    TEModalHeader
} from "tw-elements-react";

import utf8 from 'utf8';
import NumberInputComponent from "../components/NumberInputComponent";


import "../pages/Dashboard.css";
import {useAuthContext} from "../auth/context";
import {Apis} from "../api";
import Sidebar from "../components/Sidebar";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const { user, isAdmin, setUserInfo, resetUserInfo, showLoginModal, setShowLoginModal} = useAuthContext();

    // Login/Register Data
    const [registerData, setRegisterData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    // const [searchValue, setSearchValue] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isLogin, setIsLogIn] = useState(true);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showForgottenModal, setShowForgottenModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [isEnteredEmail, setIsEnteredEmail] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleShowClick = () => {
        setIsShow((pre) => !pre);
    };

    const handlePassword = (e) => {
        const newloginData = {...loginData};
        setLoginData({...newloginData, password: e.target.value});
        const newRegisterData = {...registerData};
        setRegisterData({...newRegisterData, password: e.target.value});
    };

    //If Verification is successfull
    const handleShowVerifyModal = (isSuccess) => {
        if (isSuccess) {
            setShowVerifyModal(false);
        }
    }

    // Post if Forgotten email is entered
    const handleVerifyEmail = async () => {
        try {
            const response = await Apis.myPost(
                `account/forgot_password`,
                {email: verifyEmail}
            );
            toast.success(response.data.message);
            setIsEnteredEmail(true);
            console.log(response.data);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    }

    // If Fogotten verification is successfull
    const handleShowFogorttenModal = (isSuccess) => {
        if (isSuccess) {
            setShowForgottenModal(false);
            setShowResetModal(true);
        }
    }

    // Post password reset request
    const handleResetPassword = async () => {
        try {
            const response = await Apis.myPost(
                `account/change_password`,
                {old_password: utf8.encode(oldPassword), new_password: utf8.encode(newPassword)},
                {
                    headers: {Authorization: `token ${localStorage.getItem('token')}`}, //here I want to pass Bearer Token
                }
            );
            toast.success(response.data.message);
            setShowResetModal(false);
            console.log(response.data);
        } catch (error) {
            toast.error(error.message);

            console.error(error);
        }
    }

    //email copy
    const handleCopy = () => {
        navigator.clipboard
            .writeText(`https://degime.net/${localStorage.getItem('urlName')}`)
            .then(() => {
                console.log("Value copied to clipboard:", user.email);
            })
            .catch((error) => {
                console.error("Failed to copy value to clipboard:", error);
            });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Hide the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // post Register/Login
    const postRegister = async () => {
        if (isLogin) {
            try {
                const response = await Apis.myPost(
                    `account/login`,
                    loginData
                );
                toast.success(`${response.data.username} is successfully logined!`);
                const user = response.data;
                setUserInfo(user);
                setShowLoginModal(false);
                console.log(response.data);
            } catch (error) {
                toast.error(error.message);
                console.error(error);
            }
        } else {
            if (verifyPassword !== registerData.password) {
                toast.error("Password dismatch!");
            } else {
                try {
                    const response = await Apis.myPost(
                        `account/register/vcode`,
                        registerData
                    );
                    toast.success(`${registerData.username} is successfully registered!`);
                    const user = response.data;
                    setUserInfo(user);
                    setShowLoginModal(false);
                    setShowVerifyModal(true);
                    console.log(response.data);
                } catch (error) {
                    toast.error(error.message);
                    console.error(error);
                }
            }
        }
    };

    const onLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();

        resetUserInfo();
    }

    const onClickMenu= (path) => {
        if (user){
            navigate(path);
        } else {
            setShowLoginModal(true);
        }
    }

    return (
        <>
            <div className="relative">
                <div className="selectiveBackground relative">
                    <div className="flex justify-between">
                        <Link to="/dashboard" className="">
                            <div className="logo md:hidden"></div>
                        </Link>
                        {/*<img*/}
                        {/*    alt="contactLists"*/}
                        {/*    src="/image/user.png"*/}
                        {/*    width="50"*/}
                        {/*    height="50"*/}
                        {/*    className="inline-block self-start mt-10 mr-10 cursor-pointer"*/}
                        {/*    onClick={() => setShowLoginModal(true)}*/}
                        {/*/>*/}
                    </div>
                    {/*<div className="mainUserInfo　hidden">*/}
                    {/*    <div className="flex flex-col">*/}
                    {/*        <div className="userImage bg-neutral-200 shadow-lg mx-auto">*/}
                    {/*            <img*/}
                    {/*                className="userAvatar"*/}
                    {/*                alt="userAvatar"*/}
                    {/*                src={(!currentUser || currentUser.avatar === "null" || !currentUser.avatar) ? "/image/user_default.png" : currentUser.avatar}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div className="userInformation">*/}
                    {/*            <div className="userName">{currentUser && currentUser.username}</div>*/}
                    {/*            <div className="flex items-center justify-center ml-3">*/}
                    {/*                <div className="userEmail" id="copyPane">{localStorage.getItem('urlName') === null ?*/}
                    {/*                    <Link onClick={() => setShowModal(true)} to=""*/}
                    {/*                          className="hover:underline hover:text-sky-400 active:text-sky-700">ログインするにはここに</Link> : `https://degime.net/${localStorage.getItem('urlName')}`}</div>*/}
                    {/*                <div*/}
                    {/*                    onClick={handleCopy}*/}
                    {/*                    className="w-[20px] inline-block cursor-pointer ml-2"*/}
                    {/*                >*/}
                    {/*                    <img alt="copy" src="/image/copy.png"*/}
                    {/*                         className={localStorage.getItem('urlName') === null ? "hidden" : "inline-block"}/>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="alarmPart">
                    <img alt="alarm" src="/image/alarm.png" id="alarm"></img>
                    <div className="alarmBadge"></div>
                    <div className="downBar" ref={dropdownRef}>
                        <img
                            alt="contactLists"
                            src="/image/contactLists.png"
                            id="contactLists"
                            onClick={toggleDropdown}
                        ></img>
                        {isOpen && (
                            <div className="downList mt-[10px]">
                                <div className="unannouncedList list">
                                    <Link className="listLink" to="/layout/list/nocontactlist">
                                        非通知一覧
                                    </Link>
                                </div>
                                <div className="blockList list">
                                    <Link className="listLink" to="/layout/list/blocklist">
                                        ブロック一覧
                                    </Link>
                                </div>
                                <div className="deleteList list">
                                    <Link className="listLink" to="/layout/list/deletedlist">
                                        削除一覧
                                    </Link>
                                </div>
                                {
                                    user &&
                                    <div className="deleteList list">
                                        <Link className="listLink" to="" onClick={onLogout}>
                                            ログアウト
                                        </Link>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
                <div className="mainButtons">
                  <span className="searchButton button">
                    <div id="searchIcon" className="flex justify-center">
                      <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M17.0635 18.9371C14.9388 20.5885 12.2648 21.3676 9.58605 21.1157C6.90731 20.8638 4.42524 19.5999 2.64524 17.5813C0.865234 15.5627 -0.0788693 12.9412 0.00516452 10.2506C0.0891983 7.55999 1.19505 5.0026 3.09755 3.09913C5.00005 1.19566 7.55615 0.0892437 10.2454 0.00516714C12.9346 -0.0789094 15.5548 0.865674 17.5723 2.64658C19.5899 4.4275 20.8532 6.91082 21.105 9.59092C21.3567 12.271 20.5781 14.9464 18.9275 17.0722L26 24.1219L24.1228 26L17.0768 18.9371H17.0635ZM10.5859 18.5139C11.6276 18.5139 12.659 18.3086 13.6213 17.9098C14.5836 17.511 15.458 16.9265 16.1945 16.1896C16.9311 15.4526 17.5153 14.5778 17.9139 13.615C18.3125 12.6522 18.5177 11.6202 18.5177 10.5781C18.5177 9.53595 18.3125 8.50401 17.9139 7.5412C17.5153 6.57838 16.9311 5.70355 16.1945 4.96664C15.458 4.22973 14.5836 3.64518 13.6213 3.24637C12.659 2.84756 11.6276 2.6423 10.5859 2.6423C8.4823 2.6423 6.46483 3.47839 4.97733 4.96664C3.48984 6.45489 2.65417 8.47339 2.65417 10.5781C2.65417 12.6828 3.48984 14.7013 4.97733 16.1896C6.46483 17.6778 8.4823 18.5139 10.5859 18.5139Z"
                            fill="white"
                        />
                      </svg>
                    </div>
                    <div id="stick"></div>
                    <form autoComplete="off">
                      <input type="text" className="hidden" autoComplete="false"/>
                      <input type="text" role="presentation" autoComplete="off" className="searchInput" id="searchinput"
                             placeholder="検索"/>
                    </form>
                    <div id="deleteIcon">
                      <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M11 0C4.917 0 0 4.917 0 11C0 17.083 4.917 22 11 22C17.083 22 22 17.083 22 11C22 4.917 17.083 0 11 0ZM16.5 14.949L14.949 16.5L11 12.551L7.051 16.5L5.5 14.949L9.449 11L5.5 7.051L7.051 5.5L11 9.449L14.949 5.5L16.5 7.051L12.551 11L16.5 14.949Z"
                            fill="#F8F8F8"
                        />
                      </svg>
                    </div>
                  </span>
                    <Link className="onlinePattern button mainButtonMargin" to="/online">
                        <div className="space"></div>
                        <div className="buttonName">オンライン名刺編集</div>
                        <div className="plusIcon">
                            <svg
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.3329 3.77817C15.0315 -0.523156 8.07784 -0.523156 3.77651 3.77817C-0.524818 8.07951 -0.524818 15.0332 3.77651 19.3345C8.07784 23.6359 15.0315 23.6359 19.3329 19.3345C23.6342 15.0332 23.6342 8.07951 19.3329 3.77817ZM12.6514 18.2378H10.458V12.6531L4.87324 12.6531L4.87324 10.4596H10.458L10.458 4.8749H12.6514L12.6514 10.4596H18.2361L18.2361 12.6531L12.6514 12.6531V18.2378Z"
                                    fill="#F8F8F8"
                                />
                            </svg>
                        </div>
                    </Link>
                    <Link className="snsPattern button mainButtonMargin" to="/editsocial">
                        <div className="space"></div>
                        <div className="buttonName">SNS向けリンクツリー</div>
                        <div className="plusIcon">
                            <svg
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.3329 3.77817C15.0315 -0.523156 8.07784 -0.523156 3.77651 3.77817C-0.524818 8.07951 -0.524818 15.0332 3.77651 19.3345C8.07784 23.6359 15.0315 23.6359 19.3329 19.3345C23.6342 15.0332 23.6342 8.07951 19.3329 3.77817ZM12.6514 18.2378H10.458V12.6531L4.87324 12.6531L4.87324 10.4596H10.458L10.458 4.8749H12.6514L12.6514 10.4596H18.2361L18.2361 12.6531L12.6514 12.6531V18.2378Z"
                                    fill="#F8F8F8"
                                />
                            </svg>
                        </div>
                    </Link>
                    <Link className="contactManage button small-btn" to="/contact">
                        <div className="buttonName">名刺管理</div>
                        {/* <div className="dashBoardBadge mainContactBadge">
              {props.contact_badge}
            </div> */}
                    </Link>
                    <Link className="degimeWrite button small-btn" to="/write">
                        <div className="buttonName">degimeカードに書き込む</div>
                    </Link>
                    <Link className="degimeBuy button small-btn" to="/buy">
                        <div className="buttonName">degimeカード購入する</div>
                    </Link>
                </div>
                <div className="md:hidden bottom">
                    <div className="h-full flex items-center justify-around">
                        <div className="bottomLink" onClick={() => navigate("/dashboard")}>
                            <img className="bottomIcon" alt="home" src="/image/home.png"/>
                            <span className="bottomIconContent hidden">トップ</span>
                        </div>
                        <div className="setting bottomLink" onClick={() => onClickMenu("/setting")}>
                            <img
                                className="bottomIcon"
                                alt="setting"
                                src="/image/setting.png"
                            ></img>
                            <span className="bottomIconContent hidden">設定</span>
                        </div>
                        <div className="data bottomLink" onClick={() => onClickMenu("/data")}>
                            <img className="bottomIcon" alt="data" src="/image/data.png"></img>
                            <span className="bottomIconContent hidden">データ管理</span>
                        </div>
                        <div className="contactManageBottom bottomLink" onClick={() => onClickMenu("/contact")}>
                            <img
                                className="bottomIcon"
                                alt="contact"
                                src="/image/contact.png"
                            ></img>
                            <span className="bottomIconContent hidden">名刺管理</span>
                            {/* <div className="dashBoardBadge bottomContactBadge">
                {props.contact_badge}
              </div> */}
                        </div>
                        <div className="chat bottomLink" onClick={() => onClickMenu("/chat/list")}>
                            <img className="bottomIcon" alt="chat" src="/image/chat.png"></img>
                            <span className="bottomIconContent hidden">チャット</span>
                            {/* <div className="dashBoardBadge chatBadge">{props.chat_badge}</div> */}
                        </div>
                        <div className="shop bottomLink" onClick={() => onClickMenu("/shop")}>
                            <img className="bottomIcon" alt="shop" src="/image/shop.png"></img>
                            <span className="bottomIconContent hidden">ショップ</span>
                        </div>
                        {isAdmin && (
                            <div className="top bottomLink" onClick={() => onClickMenu("/admin")}>
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
                                <span className="bottomIconContent hidden">アドミン</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bottomSpace"></div>
            </div>
            <TEModal show={showLoginModal} setShow={setShowLoginModal} staticBackdrop>
                <TEModalDialog
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <TEModalContent>
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            <div className="login mx-8">
                                <div className="flex justify-center relative">
                                    <Link
                                        alt="logo"
                                        className="logo"
                                        to=""
                                        onClick={() => setShowLoginModal(false)}
                                    ></Link>
                                    <button
                                        type="button"
                                        className="absolute -right-4 top-4 box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                        onClick={() => setShowLoginModal(false)}
                                        aria-label="Close"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-center text-[22px] font-medium">
                                    {isLogin ? "ログイン" : "新規登録"}
                                </div>
                                <div className="font-semibold mt-[20px]">
                                    {isLogin
                                        ? "アカウント登録がお済みでない方は、"
                                        : "すでに登録済みの方は、"}
                                    <Link
                                        className="text-blue-500 underline"
                                        to=""
                                        onClick={() => setIsLogIn((pre) => !pre)}
                                    >
                                        こちら
                                    </Link>
                                    {isLogin ? "から新規登録できます" : "からログインできます"}
                                </div>
                                <form className="loginMainInfo mt-[30px]" action="">
                                    <label className="font-medium text-zinc-400">Eメール</label>
                                    <div className="flex items-center">
                                        <img
                                            alt="mail"
                                            src="/image/email.png"
                                            className=" w-4 h-fit"
                                        ></img>
                                        <input
                                            value={loginData.username}
                                            onChange={(e) => {
                                                setLoginData((pre) => ({
                                                    ...pre,
                                                    username: e.target.value
                                                }));
                                                setRegisterData((pre) => ({
                                                    ...pre,
                                                    email: e.target.value,
                                                }));
                                            }}
                                            type="email"
                                            className="w-full ml-3 focus:outline-none focus:border-none text-black peer-[1]: placeholder-slate-700 placeholder:font-medium bg-white"
                                            placeholder="メールアドレスを入力"
                                        ></input>
                                    </div>
                                    <div
                                        className="w-full h-[2px] bg-neutral-400 mt-1 peer-[1]-focused:bg-slate-900"></div>
                                    {!isLogin && (
                                        <div>
                                            <label className="mt-[60px] font-medium text-zinc-400">
                                                ユーザー名(半角英数字４文字以上)
                                            </label>
                                            <div className="flex items-center">
                                                <img
                                                    alt="mail"
                                                    src="/image/user.png"
                                                    className=" w-4 h-fit"
                                                ></img>
                                                <input
                                                    value={registerData.username}
                                                    onChange={(e) => {
                                                        setRegisterData((pre) => ({
                                                            ...pre,
                                                            username: e.target.value,
                                                        }));
                                                    }}
                                                    type="text"
                                                    className="w-full ml-3 focus:outline-none focus:border-none text-black peer-[1]: placeholder-slate-700 placeholder:font-medium bg-white"
                                                    placeholder="ユーザー名を入力"
                                                ></input>
                                            </div>
                                            <div
                                                className="w-full h-[2px] bg-neutral-400 mt-1 peer-[1]-focused:bg-slate-900"></div>
                                        </div>
                                    )}

                                    <label className="mt-[60px] font-medium text-zinc-400">
                                        パスワード
                                    </label>
                                    <div className="flex items-center">
                                        <img
                                            alt="password"
                                            src="/image/password.png"
                                            className=" w-4 h-fit"
                                        ></img>
                                        <input
                                            value={loginData.password}
                                            onChange={handlePassword}
                                            type={isShow ? "text" : "password"}
                                            className="w-full ml-3 focus:outline-none focus:border-none text-black placeholder-slate-900 placeholder:font-medium bg-white"
                                            placeholder="パスワードを入力"
                                        ></input>
                                        <img
                                            alt="eye"
                                            src={
                                                isShow ? "/image/eye-close.png" : "/image/eye-open.png"
                                            }
                                            onClick={handleShowClick}
                                            className="cursor-pointer w-4 h-fit"
                                        ></img>
                                    </div>
                                    <div className="w-full h-[2px] bg-neutral-400 mt-1"></div>
                                    {!isLogin && (
                                        <>
                                            <label className="mt-[60px] font-medium text-zinc-400">
                                                パスワードを再入力してください
                                            </label>
                                            <div className="flex items-center">
                                                <img
                                                    alt="password"
                                                    src="/image/password.png"
                                                    className=" w-4 h-fit"
                                                ></img>
                                                <input
                                                    value={verifyPassword}
                                                    onChange={(e) => setVerifyPassword(e.target.value)}
                                                    type={isShow ? "text" : "password"}
                                                    className="w-full ml-3 focus:outline-none focus:border-none text-black placeholder-slate-900 placeholder:font-medium bg-white"
                                                    placeholder="パスワード再入力"
                                                ></input>
                                                <img
                                                    alt="eye"
                                                    src={
                                                        isShow
                                                            ? "/image/eye-close.png"
                                                            : "/image/eye-open.png"
                                                    }
                                                    onClick={handleShowClick}
                                                    className="cursor-pointer w-4 h-fit"
                                                ></img>
                                            </div>
                                            <div className="w-full h-[2px] bg-neutral-400 mt-1"></div>
                                        </>
                                    )}
                                    {isLogin && (
                                        <Link
                                            className="fogetPassword float-right mr-2 mt-3"
                                            to=""
                                            onClick={() => {
                                                setShowLoginModal(false);
                                                setShowForgottenModal(true)
                                            }}
                                        >
                                            パスワードを忘れた方
                                        </Link>
                                    )}
                                    <div
                                        className="w-full text-white text-center cursor-pointer bg-sky-400 hover:bg-sky-500 active:bg-sky-600 transition duration-75 ease-in-out py-3 rounded-full text-base mt-16"
                                        onClick={postRegister}
                                    >
                                        {isLogin ? "ログイン" : "新規登録"}
                                    </div>
                                </form>
                                <div className="socialLinks flex w-60 mt-[60px] mx-auto justify-between mb-[30px]">
                                    <div className="cursor-pointer hover:opacity-70 active:opacity-50">
                                        <img
                                            className="faceBook w-10 h-fit"
                                            alt="facebook"
                                            src="/image/facebook.png"
                                        ></img>
                                    </div>
                                    <div className="cursor-pointer hover:opacity-70 active:opacity-50">
                                        <img
                                            className="apple w-10 h-fit"
                                            alt="apple"
                                            src="/image/apple.png"
                                        ></img>
                                    </div>
                                    <div className="cursor-pointer hover:opacity-70 active:opacity-50">
                                        <img
                                            className="google w-10 h-fit"
                                            alt="google"
                                            src="/image/google.png"
                                        ></img>
                                    </div>
                                </div>
                            </div>
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
            <TEModal show={showVerifyModal} setShow={setShowVerifyModal} staticBackdrop>
                <TEModalDialog
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <TEModalContent>
                        <TEModalHeader style={{backgroundColor: "#38bdf8"}}>
                            <h1 className="text-2xl p-3 text-white">メールコードの確認してください。</h1>
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowVerifyModal(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="grey"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            <NumberInputComponent email={registerData.email} isSuccessful={handleShowVerifyModal}/>
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
            <TEModal show={showForgottenModal} setShow={setShowForgottenModal} staticBackdrop>
                <TEModalDialog
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <TEModalContent>
                        <TEModalHeader style={{backgroundColor: "#38bdf8"}}>
                            <h1 className="text-2xl p-3 text-white">{isEnteredEmail ? "メールコードを確認してください。" : "メールアドレスを入力"}</h1>
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowForgottenModal(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="grey"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            {
                                isEnteredEmail ?
                                    <NumberInputComponent email={verifyEmail} isForgotten={showForgottenModal}
                                                          isSuccessful={handleShowFogorttenModal}/>
                                    :
                                    <>
                                        <div className='w-full flex justify-center flex-col'>
                                            <label htmlFor="verifyEmail">メールアドレス</label>
                                            <input value={verifyEmail} onChange={(e) => setVerifyEmail(e.target.value)}
                                                   type="email" id="verifyEmail" className="border p-2"/>
                                        </div>
                                        <div className='flex justify-center mt-10 mb-5'>
                                            <TERipple>
                                                <button type="button"
                                                        className='px-5 py-2 rounded-full bg-green-500 cursor-pointer text-white'
                                                        onClick={handleVerifyEmail}>確 認
                                                </button>
                                            </TERipple>
                                        </div>
                                    </>
                            }
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
            <TEModal show={showResetModal} setShow={setShowResetModal} staticBackdrop>
                <TEModalDialog
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <TEModalContent>
                        <TEModalHeader style={{backgroundColor: "#38bdf8"}}>
                            <h1 className="text-2xl p-3 text-white">メールコードの確認してください。</h1>
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowResetModal(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="grey"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            <div className='w-full flex justify-center flex-col'>
                                <label htmlFor="oldPassword">以前のパスワード</label>
                                <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                       type="password" id="oldPassword" className="border p-2"/>
                            </div>
                            <div className='w-full flex justify-center flex-col'>
                                <label htmlFor="newPassword">新しいパスワード</label>
                                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                       type="password" id="newPassword" className="border p-2"/>
                            </div>
                            <div className='flex justify-center mt-10 mb-5'>
                                <TERipple>
                                    <button type="button"
                                            className='px-5 py-2 rounded-full bg-green-500 cursor-pointer text-white'
                                            onClick={handleResetPassword}>確 認
                                    </button>
                                </TERipple>
                            </div>
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </>
    );
};

export default Dashboard;
