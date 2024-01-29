import React from 'react'
import { Link } from 'react-router-dom'

export default function Setting() {
  return (
    <div className='p-10'>
      <Link to="/dashboard"><img alt="logo" src="/image/logo.png" width="150" className='pt-3 pl-5 mb-5' /></Link>
      <label className='text-md'>ID</label>
      <input type="text" className='w-full p-2 text-lg border rounded-md'/>
      <label className='text-md mt-3'>プロフィールURL</label>
      <div className="relative">
        <input type="text" className='w-full p-2 text-lg border rounded-md'/>
        <div className='absolute top-1/2 right-2 py-1 px-4 text-white bg-green-500 hover:bg-green-700 active:bg-green-900 rounded-lg -translate-y-1/2 cursor-pointer'>編集</div>
      </div>
      <div className="relative my-3">
        <input type="text" className='w-full p-2 text-lg border rounded-md'/>
        <div className='absolute top-1/2 right-2 py-1 px-4 text-white bg-green-500 hover:bg-green-700 active:bg-green-900 rounded-lg -translate-y-1/2 cursor-pointer'>編集</div>
      </div>
      <div className="relative">
        <input type="text" className='w-full p-2 text-lg border rounded-md'/>
        <div className='absolute top-1/2 right-2 py-1 px-4 text-white bg-green-500 hover:bg-green-700 active:bg-green-900 rounded-lg -translate-y-1/2 cursor-pointer'>編集</div>
      </div>
      <div className='mt-10 py-1 px-4 inline-block text-white bg-sky-500 rounded-lg'>NFCに書き込み</div>
      <label className='text-md mt-3'>名前</label>
      <input type="text" className='w-full p-2 text-lg border rounded-md'/>
      <label className='text-md mt-3'>ユーザー名</label>
      <input type="text" className='w-full p-2 text-lg border rounded-md'/>
      <label className='text-md mt-3'>アバター　※ここで一括して自分の写真を登録できます。</label>
      <input type="file" className='w-full p-2 text-lg border rounded-md'/>
      <label className='text-md mt-3'>メールアドレス</label>
      <input type="file" className='w-full p-2 text-lg border rounded-md'/>
      <div className='flex justify-around items-center my-3 flex-wrap'>
        <p className='sm:w-full text-sm md:w-[60%]'>メールアドレスを変更する場合は、新しいメールアドレスに変更のうえ、「仮登録メールを送信」を
          クリックしてください。
          送信後24時間以内に、メールに記載されているURLをクリックしていただくと、メールアドレス変更が完了となります。</p>
        <div className='md:w-[20%] mt-3 bg-zinc-300 hover:bg-zinc-400 active:bg-zinc-500 cursor-pointer p-3 rounded-md'>仮登録メールを送信</div>
      </div>
      <div className='py-3 px-4 border-l-4 border-l-indigo-600'>メール配信状況</div>
      <div className='flex justify-center'>
        <div className='mt-5 py-2 px-4 mr-10 inline-block text-white bg-sky-500 rounded-lg'>配信中</div>
        <div className='mt-5 py-2 px-4 inline-block text-neutral-500 bg-slate-300 rounded-lg'>配信しない</div>
      </div>
      <div className='py-3 my-3 px-4 border-l-4 border-l-indigo-600'>パスワードの変更</div>
      <form className='md:w-[50%] sm:w-full'>
        <label className='text-md mt-3'>変更したい現在使用中のパスワード入力</label>
        <input type="text" className='w-full p-2 text-lg border rounded-md'/>
        <label className='text-md mt-3'>新しいパスワードを入力</label>
        <input type="text" className='w-full p-2 text-lg border rounded-md'/>
        <label className='text-md mt-3'>新しいパスワードを再入力</label>
        <input type="text" className='w-full p-2 text-lg border rounded-md'/>
        <div  className='ml-auto block w-[150px] text-center p-2 mt-3 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer'>パスワード変更</div>
      </form>
      <div className='py-3 my-3 px-4 border-l-4 border-l-indigo-600'>ご意見・ご質問・お問い合わせはこちらから</div>
      <div className='p-5'>
        <div>アカウント名：　haruko</div>
        <div>返信先のメールアドレス：　master@sinka.link</div>
        <label className='text-md mt-3'>件名</label>
        <input type="text" className='w-full p-2 text-lg border rounded-md'/>
        <label className='text-md mt-3'>本文</label>
        <input type="text" className='w-full p-2 text-lg border rounded-md'/>
        <div  className='ml-auto block w-[150px] text-center p-2 mt-3 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer'>送信する</div>
      </div>
    </div>
  )
}
