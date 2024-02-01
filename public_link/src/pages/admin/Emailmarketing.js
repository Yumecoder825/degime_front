import React from "react"
import TextEditor from "../../components/Textedit"
import { Divider } from "@mui/material"
import { Link } from "react-router-dom/dist"

export default function Emailmarketing() {
  return (
    <div className="relative">
      <Link to="/dashboard" className="inline-block" ><img alt="logo" src="/image/logo.png" width="200" className="ml-9 pt-4" /></Link>
      <div className="header pt-10 px-10">
        <h1 className="text-lg">送信履歴</h1>
        <div className="flex gap-x-3 mt-8">
          <div className="relative">
            <label className="absolute -top-6" htmlFor="deliverdate">送信開始日時</label>
            <input className="rounded-md p-2  border-2" type="text" name="delivereddate"  />
          </div>
          <div className="relative">
            <label className="absolute -top-6" htmlFor="delivercount">送信数</label>
            <input className="rounded-md p-2  border-2" type="text" name="delivercount" />
          </div>
          <input type="text" name="display" className="text-center bg-white rounded-md border-2 " value="本文表示" disabled />
        </div>
        <div className="flex w-full my-3 items-center">
          <label className="w-10">件名</label>
          <input type="text" className="w-full p-1 rounded border-2 "/>
        </div>
      </div>
      <Divider />
      <div className="p-10">
        <h1 className="pb-10 text-lg">メール作成</h1>
        <div className="flex w-full items-center">
          <label className="w-10">件名</label>
          <input type="text" className="w-full p-1 rounded border-2 "/>
        </div>
        <h2 className="mt-5 mb-3 text-md">ヘッダー</h2>
        <TextEditor />
        <h2 className="mt-5 mb-3 text-md">本文</h2>
        <TextEditor />
        <h2 className="mt-5 mb-3 text-md">フッター</h2>
        <TextEditor />
      </div>
      <div className="absolute bottom-0 right-10 bg-sky-400 text-white hover:bg-sky-500 active:bg-sky-600 cursor-pointer inline-block rounded-lg p-1 px-3">送信する</div>
    </div>
  )
}
