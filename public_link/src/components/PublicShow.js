import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import { myConfig } from '../utilities/config';
import { toast } from 'react-toastify';
import PublicView from './PublicView';
import PublicViewSocial from './PublicViewSocial';
import { TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";

export default function PublicShow() {
  const navigate = useNavigate();
  const hasMounted = useRef(false);
  const [isExist, setIsExist] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showData, setShowData] = useState({
    'bgColor':'',
    'bgURL':'',
    'wordColor':'',
    'cardColor':'',
    'cardURL':'',
    'url_name': '',
    'faceImg' : '',
    'realName' : '',
    'company_url' : '',
    'companyName' : '',
    'position' : '',
    'phoneNumber' : '',
    'mobilePhoneNumber' : '',
    'mailAddress' : '',
    'address' : '',            
    'idCard' : {
      'idCard':[]
    },
    'socialLink':{
      'socialLink':[]
    },
    'onlineCard_Data': {
        'imgLink1' : [],
        'imgLink2' : [],
        'imgLink3' : [],
        'imgLink4' : [],
        'videoLink' : [],
        'textLink' : [],
        'mapLink' : [],
        'selfProfile' : [],
        'slideLink' : [],
        'spaceAdd' : [],
      }
  });

  const getData = async () => {
    const current_url = window.location.href;
    const parts = current_url.split("/");
    const desiredPart = parts[parts.length - 1];
    try {
      const response = await axios.get(
        `${myConfig.apiUrl}/social/public/online?url_name=${desiredPart}`
      );
      toast.success( `${response.data[0].user}'s Online Profile found!`);
      // console.log("ShowData: ", response.data[0]);
      setIsExist(true);
      setIsOnline(true);
      setShowData(response.data[0]);
    } catch (error) {
      try {
        const response = await axios.get(
          `${myConfig.apiUrl}/social/public/snstree?url_name=${desiredPart}`
        );
        toast.success( `${response.data[0].user}'s Social Profile found!`);
        // console.log("ShowData: ", response.data[0]);
        setIsExist(true);
        setIsOnline(false);
        setShowData(response.data[0]);
      } catch (error) {
        toast.error("No page exists!");
        console.error(error.message);
      }
    }
  }

  useEffect(() => {
    if (!hasMounted.current) {
      // Your code here will run only once when the component is first loaded
      getData();
      console.log('Component loaded');
      hasMounted.current = true;
    }
  }, []);

  const handleSave = async () => {
    if(localStorage.getItem('isLogin')){
      try {
        const response = await axios.put(
          `${myConfig.apiUrl}/social/private/contactdata`,
          {member:showData.user},
          {
            headers:{Authorization:`token ${localStorage.getItem('token')}`}
          }
        );
        toast.success('Successfully saved.');
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    else{
      toast.info("To save this profile, log in please.");
      navigate("/dashboard");
    }
  }
  return (
    <div>
      {
        isExist && isOnline ? <PublicView publishData={showData} /> : <PublicViewSocial publishData={showData} /> 
      }
      <div className='absolute top-4 md:right-[27vw] sm:right-[10vw] right-[10vw]' >
        <TERipple>
          <div className=' w-[160px] text-white inline-block py-2 text-center rounded-lg bg-green-500 cursor-pointer' onClick={handleSave} >名刺を保存する</div>
        </TERipple>
      </div>
    </div>
  )
}
