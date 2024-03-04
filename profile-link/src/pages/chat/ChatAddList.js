import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchChat from '../../components/SearchChat';
import ChatAdditem from '../../components/ChatAdditem';

import { getDatafromDatabase } from '../../utilities/config';

export default function ChatAddList() {
  const [addList, setAddList] = useState([]);
  const [contactList, setContactList] = useState([]);


  const ref = useRef();
  useEffect(()=>{
    async function fetchdata(){
      let newData = await getDatafromDatabase('addChat');
      if(newData) newData = newData.filter((item)=>item.is_chat_available !== 'True');
      newData && setContactList(newData);
      let addNewData = await getDatafromDatabase('True');
      if(addNewData) addNewData = addNewData.filter((item)=>item.is_chat_available !== 'True');
      addNewData && setAddList(addNewData);
    }
    if(!ref.current){
      fetchdata();
      ref.current = true;
    }
  }, []);

  return (
    <div>
      <div className='header pt-8 px-10'>
        <div className='flex items-center mb-[70px]'>
          <Link to ="/dashboard"><img src="/image/turn-left.png" alt="return" className="absolute top-3 w-[40px] h-[60px] cursor-pointer py-2"></img></Link>
          <h1 className='mx-auto text-2xl font-bold'>チャットページ</h1>
        </div>
        <SearchChat />
      </div>
      <div className="w-[80%] mt-10 mx-auto relative">
        <ul className="p-6">
          {addList.length>0 &&
            addList.map((person, index) => (
              <ChatAdditem
                key={index}
                url={person.member_avatar}
                username={person.member}
                content={person.member_email}
                is_online=""
                date=""
                isAdd={true}
                id={index}
              />
            ))}
          {contactList.length>0 &&
            contactList.map((person, index) => (
              <ChatAdditem
                key={index}
                url={person.member_avatar}
                username={person.member}
                content={person.member_email}
                is_online=""
                date=""
                id={index}
                isAdd={false}
              />
            ))}
        </ul>
      </div>
    </div>
  )
}
