import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import { myConfig } from '../utilities/config';
import { toast } from 'react-toastify';
import PublicView from './PublicView';
import PublicViewSocial from './PublicViewSocial';

export default function PublicShow() {
  const hasMounted = useRef(false);
  const [isExist, setIsExist] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
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
        toast.error(error.message);
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
  return (
    <div>
      {
        isExist && isOnline ? <PublicView publishData={showData} /> : <PublicViewSocial publishData={showData} /> 
      }
    </div>
  )
}
