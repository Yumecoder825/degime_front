import React, { useState } from 'react';
import {Apis} from "../api";

export default function ChatAdditem({url, username, content, isAdd, date, is_online}) {
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePending = async () => {
    const postUrl = "social/private/contactdata?is_pending=True";
    const body = {member:username};
    console.log(postUrl, body);
    const data= await Apis.myPut(postUrl, body);
    data && console.log(data);
    setIsActive(true);
    setIsModalOpen(false);
  }
  return (
    <>
      <li className="flex py-5 first:pt-0 last:pb-0 items-center cursor-pointer active:opacity-90" >
        <div className='relative'>
          <img className="rounded-full" width="60" height="60" src={url ? url : '/image/user_default.png'  } alt={`${username}-avatar`} />
          <div className={`absolute bottom-1 right-1 w-[15px] h-[15px] rounded-full ${is_online === 2 ? 'bg-green-500' : is_online === 1 ? 'bg-amber-300' : 'bg-red-500'} `}></div>
        </div>
        <div className="max-[350px]:ml-3 min-[350px]:ml-10 w-[35%] overflow-hidden">
            <p className="text-xl font-medium text-slate-900">{username}</p>
            <p className="text-md text-slate-900 truncate mt-3">{content}</p>
            <p className="text-sm text-slate-900 truncate ml-2">{date}</p>
        </div>
        {
          (isActive || isAdd) ? <div className='max-[620px]:px-1 min-[620px]:px-5 py-2 text-white ml-auto rounded-full bg-indigo-600'>応答待機中</div>
                   : <div className='max-[620px]:px-1 min-[620px]:px-5 py-2 text-white ml-auto rounded-full bg-orange-400' onClick={()=>{setIsModalOpen(true)}}>チャットを申請</div>
        }
      </li>
      {isModalOpen && (
          <>
            <div className='fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  max-[530px]:w-[300px] w-[500px] h-[250px] p-6 bg-white rounded-lg' style={{border:"solid 3px black"}}>
              <h2 className='text-zinc-600 text-center font-bold text-[24px] mt-2'>本当にこのユーザーをチャットに<br/>承認しますか？</h2>
              <div className='flex justify-between max-[530px]:mt-[20px] mt-[70px] font-light px-6'>
                <button className="text-zinc-600 font-bold border py-1 px-6 rounded-xl" onClick={handlePending} >はい</button>
                <button className="text-white font-bold border py-1 px-6 rounded-xl bg-orange-400 hover:bg-orange-500" onClick={()=>{setIsModalOpen(false)}}>いいえ</button>
              </div>
            </div>
            <div className='fixed w-full h-full right-0 top-0 bg-black opacity-10 z-30'></div>
          </>)
        }
    </>
  )
}
