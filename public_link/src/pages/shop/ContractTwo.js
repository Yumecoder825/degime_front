import React from 'react'
import { Link } from "react-router-dom";
import { TERipple } from "tw-elements-react";

import Progressbar from "./Progressbar";



export default function ContractTwo() {
  return (
    <div>
      <Link to="/dashboard"><img alt="logo" src="/image/logo.png" width="150" className='pt-3 pl-5' /></Link>
      <Progressbar progressState={1} />
      <div className="px-10">
        <div className='text-2xl font-bold mx-auto text-center mb-10'>支払い方法</div>
        <table className="w-full text-center">
          <tbody>
            <tr>
              <th className="py-3">削除</th>
              <th className="py-3">No</th>
              <th className="py-3">商品コード／商品名</th>
              <th className="py-3">価格</th>
              <th className="py-3">数量</th>
              <th className="py-3">小計(税込)</th>
            </tr>
            <tr className={`even:bg-white odd:bg-slate-50`}>
              <td className="px-2">
                <input type="checkbox" id="cart-check" />
              </td>
              <td className="px-2">1</td>
              <td className="px-2 flex justify-center py-2">
                <img src="/image/card_1.jpg" alt="card_1" width="72" />
                <div className="ml-3">
                  <p>A0000000001</p>
                  <p className="text-red-500">
                    <Link to="#">degimeカード</Link>
                  </p>
                </div>
              </td>
              <td className="px-2">3,300円</td>
              <td className="px-2 text-red-500">5</td>
              <td className="px-2">16,500円</td>
            </tr>
            <tr className={`even:bg-white odd:bg-slate-50`}>
              <td className="px-2">
                <input type="checkbox" id="cart-check-2" />
              </td>
              <td className="px-2">2</td>
              <td className="px-2 flex justify-center py-2">
                <img src="/image/card_2.jpg" alt="card_1" width="72" />
                <div className="ml-3">
                  <p>A0000000002</p>
                  <p className="text-red-500">
                    <Link to="#">degimeカード2</Link>
                  </p>
                </div>
              </td>
              <td className="px-2">3,100円</td>
              <td className="px-2 text-red-500">1</td>
              <td className="px-2">3,100円</td>
            </tr>
            <tr className={`even:bg-white odd:bg-slate-50`}>
              <td className="px-2">
                <input type="checkbox" id="cart-check-3" />
              </td>
              <td className="px-2">3</td>
              <td className="px-2 flex justify-center py-2">
                <img src="/image/card_3.jpg" alt="card_1" width="72" />
                <div className="ml-3">
                  <p>A0000000003</p>
                  <p className="text-red-500">
                    <Link to="#">degimeカード3</Link>
                  </p>
                </div>
              </td>
              <td className="px-2">3,300円</td>
              <td className="px-2 text-red-500">1</td>
              <td className="px-2">3,300円</td>
            </tr>
          </tbody>
        </table>
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
        <div className="flex p-6  w-full justify-end items-center ">
          <div className="px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
            必須
          </div>
          <span className="ml-4">は必須項目です</span>
        </div>
        <div className="w-full px-8 py-4 bg-slate-300 text-lg text-white">
          お支払方法
        </div>
        <div className='flex justify-between border-b-2 my-3 py-2'>
          <div className='flex items-center'>
            お支払方法
            <div className="ml-3 px-2 rounded-lg bg-red-600  text-sm text-white inline-block">
              必須
            </div>
          </div>
          <div className='w-[70%]'>お支払い方法が設定されていないため、購入ができません。お手数ですが、店舗までお問い合わせください。</div>
        </div>
        <TERipple rippleColor="white" style={{ display: "block" }}>
          <Link
            className="w-[70%] relative mx-auto justify-center bg-zinc-800 px-10 py-5 text-white mt-10 cursor-pointer flex items-center"
            to="/shop/contract/3"
          >
            最終確認へ
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
        <TERipple
          rippleColor="white"
          style={{ display: "block", paddingBottom: "100px" }}
        >
          <Link
            className="w-[50%] mx-auto justify-center bg-neutral-600 px-10 py-5 text-white mt-10 cursor-pointer flex items-center"
            to="/shop/contract/1"
          >
            前の画面へ戻る
          </Link>
        </TERipple>
      </div>
    </div>
  );
}
