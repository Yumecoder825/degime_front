import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MemoComponent from './Memocomponent';

import axios from 'axios';
import { myConfig } from '../utilities/config';
import { toast } from 'react-toastify';
import { TERipple } from 'tw-elements-react';
import {Apis} from "../api";

export default function Contactitem({url, navTab, username, email, is_new, id, onReRender, previewProfile}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] =useState(5);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [requestState, setRequestState] = useState(0);
  const dropdownRef = useRef(null);
  const modalTitle=["この人をチャットを申請しますか？", "プロフィールを見ますか？","本当にこの人を非通知しますか？", "本当にこの人をブロックしますか？", "本当にこの人を削除しますか？"]
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
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleMove = async (title) => {
    try{
      setIsMoveOpen(false);
      const response = await Apis.myPut(
        `social/private/contactdata`,
        {"member":username, "group_Name":title},
      )
      onReRender(true);
      console.log(response.data);
    }catch(err){
      console.error(err);
    }
  }

  // post contact update request
  const requestParam = ["", "", "Unannounce", "Block", "Deleted"];

  const handleModalOpen = async (num)=>{
    setIsOpen(true);
    setIsModalOpen(num);
    if(num < 4) setRequestState(num);

  }
  const handleRequest = async (num) => {
    if(requestState < 5 && requestState > 1){
      try {
        // console.log("Request: ", requestParam[requestState], username);
        const response = await Apis.myPut(
          `social/private/contactdata`,
          {"member":username, "block_setting":requestParam[requestState]},
          {
            headers:{Authorization:`token ${localStorage.getItem('token')}`}
          }
        );
        onReRender(true);
        console.log(response.data);
      } catch (err) {
        console.err(err);
      }
      setIsModalOpen(num);
    }
    else if(requestState === 0){
      try {
        // console.log("Request: ", requestParam[requestState], username);
        const response = await Apis.myPut(
          `social/private/contactdata`,
          {"member":username, "is_pending":"addChat"}
        );
        toast.success(`${username}さんにチャートを申請しました。`);
        navigate("/chat/add");
        console.log(response.data);
      } catch (err) {
        console.err(err);
      }
      setIsModalOpen(num);
    }
    else if(requestState === 1){
      if(!id) {
        try {
          const response = await Apis.myGet(
            `social/public/snstree?username=${username}`
          );
          // console.log("ShowData: ", response.data[0]);
          previewProfile(response.data[0]);
          setIsModalOpen(5);
          console.log(response);
        } catch (error) {
          toast.error("No page exists!");
          console.error(error.message);
        }
      }
      else {
        try {
          const response = await Apis.myGet(
            `social/public/online?username=${username}`
          );
          // console.log("ShowData: ", response.data[0]);
          previewProfile(response.data[0]);
          console.log(response);
        } catch (error) {
          toast.error("No page exists!");
          console.error(error.message);
        }
      }
    }
    else setIsModalOpen(num);
    setIsOpen(false);
  }
  return (
    <>
      <li className="flex py-4 first:pt-0 last:pb-0 relative items-center" >
        <img className="h-10 w-10 rounded-full bg-white p-1" src={url} alt={`${username}-avatar`} />
          {/* {
              is_new && <img className='absolute left-[32px]' src='/image/new-badge.svg' alt='newly viewed' />
          } */}
          <div className="ml-3 overflow-hidden w-[20%]">
              <p className="text-sm font-medium text-slate-900">{username}</p>
              <p className="text-sm text-slate-500 truncate">{email}</p>
          </div>
          <div className='ml-auto'  ref={dropdownRef}>
            <div className="bg-orange-400 text-sm cursor-pointer text-white font-bold py-[5px] max-[480px]:px-3 min-[480px]:px-10 rounded-full hover:bg-orange-500 focus:outline-none focus:shadow-outline transform transition-colors duration-150 self-start my-auto" onClick={toggleDropdown}>設定</div>
            {isOpen && (
              <div className="downList" >
                  <div className="recoverList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(0)}} >チャットを申請する</div></div>
                  <div className="previewList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(1)}} >プロフィールページを表示</div></div>
                  <div className="nocontactList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(2)}} >非通知</div></div>
                  <div className="blockList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(3)}} >ブロック</div></div>
                  <div className="deletedList list cursor-pointer"><div className="listLink" onClick={()=>{handleModalOpen(4)}} >削除</div></div>
                  <div className="moveList list cursor-pointer"><div className="listLink" onClick={()=>{setIsMoveOpen(true); setIsOpen(false)}} >別のグループに移動</div></div>
              </div>
            )}
          </div>
          <div className='inline-block ml-3'>
            { id < 2 && <MemoComponent />}
          </div>
      </li>
      {isModalOpen<5 && (
        <>
          <div className='absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-[530px]:w-[300px] w-[500px] h-[200px] p-6 bg-white rounded-lg' style={{border:"solid 3px black"}}>
            <h2 className='text-zinc-600 text-center font-bold text-[24px] mt-2'>{modalTitle[isModalOpen]}</h2>
            <div className='flex justify-between max-[530px]:mt-[20px] mt-[70px] font-light px-6'>
              <button className="text-zinc-600 font-bold border py-1 px-6 rounded-xl" onClick={()=>{handleRequest(5)}}>はい</button>
              <button className="text-white font-bold border py-1 px-6 rounded-xl bg-orange-400 hover:bg-orange-500" onClick={()=>{setIsModalOpen(5); setIsOpen(false);}}>いいえ</button>
            </div>
          </div>
          <div className='absolute w-full h-full right-0 top-0 bg-black opacity-10 z-30'></div>
        </>
      )
      }
      {isMoveOpen && (
        <div className='absolute after:content-[""] after:block after:clear-both inset-1/2 z-50'>
          <div className='transform -translate-x-1/2 -translate-y-1/2  max-[530px]:w-[300px] w-[500px] p-6 bg-white rounded-lg ' style={{border:"solid 3px black"}}>
            <h2 className='text-zinc-600 text-center font-bold text-[24px] mt-2'>別のグループに移動させますか？</h2>
            <button
              type="button"
              className="absolute right-2 top-2 box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setIsMoveOpen(false)}
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
            <div className='flex flex-col justify-between max-[530px]:mt-[20px] mt-[10px] font-light px-6 z-30'>
              {
                navTab.map((item, index)=>(
                  <TERipple>
                    {index !==id && <div key={index} onClick={() =>{handleMove(item.title)}} className='w-full cursor-pointer text-center p-2 rounded-full border-2 my-1'>{item.title}</div>}
                  </TERipple>
                ))
              }
            </div>
          </div>
        </div>
      )
      }
    </>

  )
}
