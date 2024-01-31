import React, { useState, useEffect } from 'react';
import Footer from './Chat/Footer';
import Header from './Chat/Header';

import { myGet } from '../../utilities/config';
import { toast } from 'react-toastify';
import SentChat from './Chat/SentChat';
import ReceivedChat from './Chat/ReceivedChat';



const room = localStorage.getItem('chatroom');
const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

const client = new WebSocket(`ws://194.87.199.12:5000/chat/${room}/${token}/${username}`);

export default function Chatpane() {
  const header = {Authorization: `token ${localStorage.getItem('token')}`};
  const [members, setMembers] =useState([]);
  const [messages, setMessages] = useState([]);


  useEffect(()=>{
    async function dispatch(){
      let newMembers = await myGet(`social/private/chatroom?room_name=${room}`, header);
      if(newMembers){
        for (const id in newMembers) {
          const newlyMembers = newMembers[id].member.filter((item)=>item.username !== username);
          newMembers[id] = {...newMembers[id], member:newlyMembers };
        }
        toast.success(`${newMembers[0].chat_group} is opened`);
        setMembers(newMembers[0]);
      }
      else return;
    }
    dispatch();

  }, []);
  
  
  useEffect(() => {
    
    client.onopen = () => {
      console.log("Websocket successfully connected");
    };
    client.onmessage = (message) => {
      // console.log("received: ", JSON.parse(message.data));
      let dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setMessages((prevState) => ([...prevState, {sender:dataFromServer.sender, text:dataFromServer.text}]));
      }
    };
    client.onclose = () => {
      console.log("Websocked is already closed")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message) => {
    if(message.trim()){
      client.send(JSON.stringify({
        type: "message",
        text: message,
        sender: username,
      }));
      console.log("Already sent", {sender:username, text:message.text});
    }

  }

  return (
    <div className='relative' style={{ height: "100vh", overflow:"scroll" }}>
      <div className='Chatheader'>
        <Header members={members} />
      </div>
      <div className="Chatbody mx-auto w-full p-10 space-y-4 overflow-auto">
        {
          messages && messages.map((item, index) => (
            item.sender === username ? <SentChat key={index} user={item.sender} avatar="/image/user_default.png" text={item.text}/>
            : <ReceivedChat key={index} user={item.sender} avatar="/image/user_default.png" text={item.text}/>
          ))
        }
        {/* {
          console.log(messages)
        } */}
      </div>
      <div className='absolute bottom-0 w-full'>
        <Footer sendMessage={sendMessage}/>
      </div>
    </div>
  );
}