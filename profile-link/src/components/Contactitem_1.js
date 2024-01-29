import React, { useState, useRef, useEffect } from 'react';
import MemoComponent from './Memocomponent';

export default function Contactitem({url, username, email, is_new, id}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] =useState(4);
  const dropdownRef = useRef(null);
  const modalTitle=["この人をチャットを申請しますか？", "プロフィールページを表示しますか？","本当にこの人を非通知しますか？", "本当にこの人をブロックしますか？", "本当にこの人を削除しますか？"]
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Hide the dropdown
      }
    };
    if(isModalOpen >= 4){
      console.log(isModalOpen);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <>
      <li className="flex py-4 first:pt-0 last:pb-0 relative items-center" >
        <img className="h-10 w-10 rounded-full bg-white p-1" src={url} alt={`${username}-avatar`} />
          {
              is_new && <img className='absolute left-[32px]' src='/image/new-badge.svg' alt='newly viewed' />
          }
          <div className="ml-3 overflow-hidden w-[20%]">
              <p className="text-sm font-medium text-slate-900">{username}</p>
              <p className="text-sm text-slate-500 truncate">{email}</p>
          </div>
          <div className='ml-auto'  ref={dropdownRef}>
            <div className="bg-orange-400 text-sm cursor-pointer text-white font-bold py-[5px] max-[480px]:px-3 min-[480px]:px-10 rounded-full hover:bg-orange-500 focus:outline-none focus:shadow-outline transform transition-colors duration-150 self-start my-auto" onClick={toggleDropdown}>設定</div>
            {isOpen && (
              <div className="downList" >
                  <div className="recoverList list cursor-pointer"><div className="listLink" onClick={()=>{setIsModalOpen(0)}} >チャットを申請する</div></div>
                  <div className="nocontactList list cursor-pointer"><div className="listLink" onClick={()=>{setIsModalOpen(1)}} >プロフィールページを表示</div></div>
                  <div className="blockList list cursor-pointer"><div className="listLink" onClick={()=>{setIsModalOpen(2)}} >非通知</div></div>
                  <div className="deletedList list cursor-pointer"><div className="listLink" onClick={()=>{setIsModalOpen(3)}} >ブロック</div></div>
                  <div className="deletedList list cursor-pointer"><div className="listLink" onClick={()=>{setIsModalOpen(4)}} >削除</div></div>
              </div>
            )}
          </div>
          <div className='inline-block ml-3'>
            { id < 2 && <MemoComponent />}
          </div>
      </li>
      {isModalOpen<4 && (
        <>
          <div className='absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-[530px]:w-[300px] w-[500px] h-[200px] p-6 bg-white rounded-lg' style={{border:"solid 3px black"}}>
            <h2 className='text-zinc-600 text-center font-bold text-[24px] mt-2'>{modalTitle[isModalOpen]}</h2>
            <div className='flex justify-between max-[530px]:mt-[20px] mt-[70px] font-light px-6'>
              <button className="text-zinc-600 font-bold border py-1 px-6 rounded-xl" onClick={()=>{setIsModalOpen(4); setIsOpen(false); }}>はい</button>
              <button className="text-white font-bold border py-1 px-6 rounded-xl bg-orange-400 hover:bg-orange-500" onClick={()=>{setIsModalOpen(4); setIsOpen(false);}}>いいえ</button>
            </div>
          </div>
          <div className='absolute w-full h-full right-0 top-0 bg-black opacity-10 z-30'></div>
        </>
      )
      }
    </>

  )
}
