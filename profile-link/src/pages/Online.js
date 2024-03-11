import React from "react";
import { Link } from "react-router-dom";

const Online = () => {
  return (
    <div className="online bg-gray-100">
      <Link to="/dashboard"><div className="logo"></div></Link>
      <div className="patternSelection flex text-center pt-3 font-bold">
        <div className="w-1/2">
          <div className="text-purple-500">オンライン名刺</div>
          <div className="w-[130px] mt-3 mx-auto bg-purple-500 h-[2px]"></div>
        </div>
        <div className=" w-1/2">
          <Link to="/editsocial">SNSリンクツリー</Link>
        </div>
      </div>
      <div className="min-w-[320px] w-[50%] aspect-[4/3] rounded-xl border-2 border-indigo-700 bg-white mt-10 mx-auto relative">
        <img
          alt="edit"
          src="/image/edit.png"
          className="absolute top-2 w-6 h-6 right-5"
        ></img>
      </div>
      <div className="flex items-center min-w-[320px] w-[50%] justify-between mx-auto mt-[30px]">
        <div className="w-[150px] h-[150px] max-[800px]:w-[110px] max-[800px]:h-[110px] rounded-full bg-gray-200 overflow-hidden relative">
          <svg
            className="w-full h-full text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="10" x2="12" y2="14"></line>
            <line x1="10" y1="12" x2="14" y2="12"></line>
          </svg>
        </div>
        <div className="w-[60%]">
          <div className="font-bold text-zinc-300 py-1 px-3 bg-white rounded-md border-zinc-300 border-[1px] mt-3">
            氏名
          </div>
          <div className="flex w-full justify-between mt-8">
            <div className="w-[50px] h-[50px] max-[800px]:w-[40px] max-[800px]:h-[40px] bg-gray-200 overflow-hidden relative">
              <svg
                className="w-full h-full text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <div className="w-[50px] h-[50px] max-[800px]:w-[40px] max-[800px]:h-[40px] bg-gray-200 overflow-hidden relative">
              <svg
                className="w-full h-full text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <div className="w-[50px] h-[50px] max-[800px]:w-[40px] max-[800px]:h-[40px] bg-gray-200 overflow-hidden relative">
              <svg
                className="w-full h-full text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <div className="w-[50px] h-[50px] max-[800px]:w-[40px] max-[800px]:h-[40px] bg-gray-200 overflow-hidden relative">
              <svg
                className="w-full h-full text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold text-zinc-300 py-2 px-3 bg-white rounded-md border-zinc-300 border-[1px] mt-10 min-w-[320px] w-[50%] mx-auto">
        会社URL
      </div>
      <div className="font-bold text-zinc-300 py-2 px-3 bg-white rounded-md border-zinc-300 border-[1px] mt-4 min-w-[320px] w-[50%] mx-auto">
        会社名
      </div>
      <div className="font-bold text-zinc-300 py-2 px-3 bg-white rounded-md border-zinc-300 border-[1px] mt-4 min-w-[320px] w-[50%] mx-auto">
        役職
      </div>
      <div className="font-bold text-zinc-300 py-2 px-3 bg-white rounded-md border-zinc-300 border-[1px] mt-4 min-w-[320px] w-[50%] mx-auto">
        電話番号
      </div>
      <div className="font-bold text-zinc-300 py-2 px-3 bg-white rounded-md border-zinc-300 border-[1px] mt-4 min-w-[320px] w-[50%] mx-auto">
        携帯電話番号
      </div>
      <div className="font-bold text-zinc-300 py-2 px-3 bg-white rounded-md border-zinc-300 border-[1px] mt-4 min-w-[320px] w-[50%] mx-auto">
        メールアドレス
      </div>
      <div className="font-bold text-zinc-300 py-2 px-3 bg-white rounded-md border-zinc-300 border-[1px] mt-4 min-w-[320px] w-[50%] mx-auto">
        住所
      </div>
      <img
        src="/image/group01.png"
        className="min-w-[320px] w-[50%] mx-auto mt-2"
        alt="group01"
      ></img>
      <img
        src="/image/group02.png"
        className="min-w-[320px] w-[50%] mx-auto mt-2"
        alt="group02"
      ></img>
      <div className="w-full h-16"></div>
      {/*<div className=" bg-grey-100 w-full h-16 text-center bottom-0 fixed ">*/}
      {/*  <Link*/}
      {/*    to="/editonline"*/}
      {/*    className=" text-white bg-sky-400 rounded-md h-10 px-4 py-2 mt-3 translate-x-[-50%] min-[980px]:left-[384px] min-[980px]:translate-x-[0px] min-[980px]:absolute"*/}
      {/*  >*/}
      {/*    このテーマを選択する*/}
      {/*  </Link>*/}
      {/*  /!* <div className="h-1 w-24 bg-black rounded-full"></div> *!/*/}
      {/*</div>*/}
    </div>
  );
};

export default Online;
