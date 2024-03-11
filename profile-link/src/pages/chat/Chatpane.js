import React, { useState, useEffect, useRef } from 'react';

import Footer from './Chat/Footer';
import Header from './Chat/Header';


import { toast } from 'react-toastify';
import SentChat from './Chat/SentChat';
import ReceivedChat from './Chat/ReceivedChat';
import {Apis} from "../../api";





export default function Chatpane() {
  const room = localStorage.getItem('chatroom');
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const [memberAvatars, setMemberAvatars] = useState([]);

  const messagesEndRef = useRef(null);
  
  const hasMounted = useRef(false);

  const [members, setMembers] =useState([]);
  const [messages, setMessages] = useState([]);
  const [toastState, setToastState] = useState(false);

  const [socket, setSocket] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  
  
  useEffect(()=>{
    async function dispatch(){
      let newMembers = await Apis.myGet(`social/private/chatroom?room_name=${room}`);
      
      if(newMembers[0]){
        const newlyMembers = newMembers[0].member.filter((item)=>item.username !== username);
        newMembers[0] = {...newMembers[0], member:newlyMembers };
        let newAvatars = [];
        newMembers[0].member.map((item, index)=>(
          newAvatars.push({user:item.username, avatar:item.avatar})
        ));
        setMemberAvatars(newAvatars);
        console.log("NewMembers, ", newMembers[0], newAvatars);
        if(!toastState)  {
          toast.success(`${newMembers[0].chat_group} is opened.`);
          setToastState(true);
        }
        setMembers(newMembers[0]);
      }
      else return;
    }
    if (!hasMounted.current) {
      dispatch();
      hasMounted.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  useEffect(() => {
    const client = new WebSocket(`ws://194.87.199.12:5000/chat/${room}/${token}/${username}`);
    setSocket(client);
    client.onopen = () => {
      console.log("Websocket successfully connected");
    };
    client.onmessage = (message) => {
      // console.log("received: ", JSON.parse(message.data));
      let dataFromServer = JSON.parse(message.data);
      if (dataFromServer.message) {
        setMessages((prevState) => ([...prevState, {sender:dataFromServer.user, text:dataFromServer.message}]));
        scrollToBottom();
      }
    };
    client.onclose = () => {
      console.log("Websocked is already closed")
    }
    return () => {
      client.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message) => {
    if(message.trim()){
      socket.send(JSON.stringify({
        type: "message",
        msg_type: "TEXT_MESSAGE",
        message: message,
        user: username,
      }));
      console.log("Already sent", {sender:username, text:message});
    }

  }

  return (
    <div className='relative' style={{ height: "100vh"}}>
      <div className='Chatheader'>
        <Header members={members} />
      </div>
      <div className="Chatbody h-[84vh] mx-auto w-full p-10 space-y-4 overflow-auto"  >
        {
          messages && messages.map((item, index) => (
            item.sender === username ? <SentChat avatar={localStorage.getItem('avatar')} key={index} user={item.sender} text={item.text}/>
            : <ReceivedChat avatar={memberAvatars.map(obj => obj.user === item.sender && obj.avatar)} key={index} user={item.sender}  text={item.text}/>
          ))
        }
        {/* {
          console.log(messages)
        } */}
        <div ref={messagesEndRef} />
      </div>
      <div className='absolute bottom-0 w-full'>
        <Footer sendMessage={sendMessage}/>
      </div>
    </div>
  );
}