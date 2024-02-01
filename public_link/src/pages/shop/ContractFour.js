import React from 'react'
import { Link } from "react-router-dom";
import { TERipple } from "tw-elements-react";

import Progressbar from "./Progressbar";



export default function ContractFour() {
  return (
    <div>
      <Link to="/dashboard"><img alt="logo" src="/image/logo.png" width="150" className='pt-3 pl-5' /></Link>
      <Progressbar progressState={3} />
      <div className="px-10">
        <div className='text-2xl font-bold mx-auto text-center mb-10'>完了しました。</div>

        <div className="flex flex-col p-6  w-full justify-end items-end bg-zinc-300">
          <div className="mr-32 mb-5 text-sm">
            商品合計
            <span className="ml-24 text-2xl text-blue-800">22,900円</span>
          </div>
          <div className="mr-32 mb-5 text-sm">
            送料
            <span className="ml-[165px] text-lg text-blue-800">0円</span>
          
          </div>
          <div className="mr-32 mb-5 text-sm">
            合計
            <span className="ml-24 text-2xl text-red-500">22,900円</span>
          </div>
          <div className="mr-32 text-green-500">(10%対象 22,900円)</div>
        </div>

        <TERipple rippleColor="white" style={{ display: "block" }}>
          <Link
            className="w-[70%] relative mx-auto justify-center bg-zinc-800 px-10 py-5 text-white mt-10 cursor-pointer flex items-center"
            to="/shop/list"
          >
            ショッピングペイジーへ
            <svg
              className="absolute right-5"
              width="13"
              height="25"
              viewBox="0 0 13 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.547878 28.2862C1.27838 29.2379 2.46276 29.2379 3.19326 28.2862L12.4521 16.2233C13.1826 15.2715 13.1826 13.7285 12.4521 12.7767L3.19327 0.713804C2.46276 -0.237936 1.27838 -0.237936 0.547878 0.713804C-0.182625 1.66554 -0.182626 3.20861 0.547878 4.16035L8.48404 14.5L0.547878 24.8396C-0.182625 25.7914 -0.182625 27.3345 0.547878 28.2862Z"
                fill="white"
              />
            </svg>
          </Link>
        </TERipple>
      </div>
    </div>
  );
}
