import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { myConfig } from '../utilities/config';
import { toast } from 'react-toastify';

import MemoComponent from './Memocomponent';

export default function Contactitem({url, username, email, is_new, id, onReRender}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] =useState(4);
  const [requestState, setRequestState] = useState(0);
  const dropdownRef = useRef(null);
  const modalTitle=["この人を名刺管理に戻しますか？", "本当にこの人を非通知しますか？", "本当にこの人をブロックしますか？", "本当にこの人を削除しますか？"]
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  const location = useLocation();
  // For example, '/block' is the path where we don't want to show the "blockList"
  const shouldHideBlockItem = location.pathname === '/layout/list/blocklist';
  const shouldHideNocontactItem = location.pathname === '/layout/list/nocontactlist';
  const shouldHideDeletedItem = location.pathname === '/layout/list/deletedlist';
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Hide the dropdown
      }
    };
    if(isModalOpen >= 4){
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);


  // post contact update request
  const requestParam = ["None", "Unannounce", "Block", "Deleted"];

  const handleModalOpen = async (num)=>{
    setIsOpen(true);
    setIsModalOpen(num);
    if(num < 4) setRequestState(num);

  }
  const handleRequest = async (num) => {
    if(requestState < 4){
      try {
        // console.log("Request: ", requestParam[requestState], username);
        const response = await axios.put(
          `${myConfig.apiUrl}/social/private/contactdata`,
          {"member":username, "block_setting":requestParam[requestState]},
          {
            headers:{Authorization:`token ${localStorage.getItem('token')}`}
          }
        );
        onReRender(true);
        console.log(response.data);
      } catch (err) {
        toast.error(err.message);
        console.err(err);
      }
      setIsModalOpen(num);
    }
    else setIsModalOpen(num);
    setIsOpen(false);
  }

  return (
    <>
      <li className="flex py-4 first:pt-0 last:pb-0 relative items-center" >
        <img className="h-10 w-10 rounded-full bg-white" src={url} alt={`${username}-avatar`} />
          {
              is_new && <img className='absolute left-[32px]' src='/image/new-badge.svg' alt='newly viewed' />
          }
          <div className="ml-3 overflow-hidden w-[20%]">
              <p className="text-sm font-medium text-slate-900">{username}</p>
              <p className="text-sm text-slate-500 truncate">{email}</p>
          </div>
          <div className='ml-auto'  ref={dropdownRef}>
            <div className="bg-orange-400 text-sm cursor-pointer text-white font-bold py-[5px]  max-[480px]:px-3 min-[480px]:px-10 rounded-full hover:bg-orange-500 focus:outline-none focus:shadow-outline transform transition-colors duration-150 self-start my-auto" onClick={toggleDropdown}>設定</div>
            {isOpen && (
              <div className="downList" >
                  <div className="recoverList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(0)}} >元に戻す</div></div>
                  { !shouldHideNocontactItem && <div className="nocontactList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(1)}} >非通知する</div></div>}
                  { !shouldHideBlockItem && <div className="blockList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(2)}} >ブロックする</div></div>}
                  { !shouldHideDeletedItem && <div className="deletedList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(3)}} >削除する</div></div>}
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
              <button className="text-zinc-600 font-bold border py-1 px-6 rounded-xl" onClick={()=>{handleRequest(4)}}>はい</button>
              <button className="text-white font-bold border py-1 px-6 rounded-xl bg-orange-400 hover:bg-orange-500" onClick={()=>{setIsModalOpen(4); setIsOpen(false); }}>いいえ</button>
            </div>
          </div>
          <div className='absolute w-full h-full right-0 top-0 bg-black opacity-10 z-30'></div>
        </>
      )
      }
    </>

  )
}
