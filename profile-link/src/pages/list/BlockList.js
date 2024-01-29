import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { myConfig } from '../../utilities/config'
// import { toast } from 'react-toastify'

import Contactitem from '../../components/Contactitem'
export default function BlockList() {
  const [blockList, setBlockList] = useState([]);
  const getDatafromDatabase = async () =>{
    try {
      const response = await axios.get(
        `${myConfig.apiUrl}/social/private/contactdata?block_setting=Block`,
        {
          headers:{Authorization: `token ${localStorage.getItem('token')}`}, //here I want to pass Bearer Token
        }
      );
      // console.log("ShowData: ", response.data[0]);
      // console.log("contactData: ", response.data);
      setBlockList(response.data);
      
      return response.data;
    } catch (error) {
      // toast.error(error.message);
      error.response.status === 404 && setBlockList([]);
      console.error(error.message);
    }
  }
  
  useEffect(()=>{
    getDatafromDatabase();
  }, []);

  return (
    <>
        <h1 className='text-xl mt-[50px] text-slate-600 font-extrabold h-30 mb-5'>ブロック一覧</h1>
        <ul  className="divide-y divide-sky-700">
          {blockList.map((person, index) => (
            <Contactitem onReRender={getDatafromDatabase} key={index} url={person.member_avatar || "/image/user_default.png"} username = {person.member} email = {person.member_email} is_new = {person.is_new} />
          ))}
        </ul>
    </>

  )
}
