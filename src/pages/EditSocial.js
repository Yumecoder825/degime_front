import React, {useState} from "react";
import { Link } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '@mui/material/Modal';

import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalBody,
  TEModalHeader
} from "tw-elements-react";

import axios from "axios";
import { toast } from "react-toastify";
import { myConfig } from "../utilities/config";

import ImageSlider from "../components/Squareimage";
import AvatarUploader from "../components/Circleimage";
import Oneimagelink from "../components/Oneimagelink";
import Twoimagelink from "../components/Twoimagelink";
import Threeimagelink from "../components/Threeimagelink";
import Fourimagelink from "../components/Fourimagelink";
import Videolinkitem from "../components/Videolinkitem";
import TextEditor from "../components/Textedit";
import Linkitem from "../components/Linkitem";
import Map from "../components/Map";
import Spaceitem from "../components/Spaceitem";
import Selfprofile from "../components/Selfprofile";
import Datetimepicker from "../components/Datetimepicker";
import Listcomponent from "../components/Listcomponent";
import PdfReader from "../components/Pdfreader";
import PublicViewSocial from "../components/PublicViewSocial";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ChromePicker } from 'react-color';  // Import ChromePicker from react-color

const EditSocial = ({profileButton}) => {
	const [profileData, setProfileData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [open, setOpen] = useState(false);
  const [arrangementOpen, setArrangementOpen] = useState(false);
  const [createType, setCreateType] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [showPublihModal, setShowPublihModal] = useState(false);
  const [publishLink, setPublishLink] = useState(localStorage.getItem('username'));
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState("#f3f4f6");
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  
  const [publishData, setPublishData] = useState({
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
    'socialLink':{},
    'snsTree_Data': {
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

  //Cloudinary upload
  const FileUpload = async (file) => {
    const cloud_name = "dz6r3o4w0";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dfuqz9xv");
    formData.append('cloud_name', cloud_name);

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dz6r3o4w0/auto/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      toast.error(err.message);
      console.log(err)
    }
    
  }
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...profileData];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setProfileData(updatedItems);
  };
  // icon0.addEventListener("click", () => {
  //   for (let i = 0; i < linkIcons.length; i++) {
  //     linkIcons[i].classList.toggle("hidden");
  //   }
  // });
  const handleProfileData = (data) =>{
    if((data.type==="oneImage" && data.data) 
      || (data.type==="twoImage" && data.data.length === 2) 
      || (data.type==="threeImage" && data.data.length === 3) 
      || (data.type==="fourImage" && data.data.length === 4)
      || (data.type==="videoLink" && data.data)
      || (data.type==="text" && data.data)
      || (data.type==="map" && data.data)
      || (data.type==="link" && data.data)
      || (data.type==="space" && data.data)
      || (data.type==="selfProfile" && data.data)
      || (data.type==="slideImage" && data.data)
      ){
      setProfileData((pre)=>{
        console.log('ProfileData', [...pre, data]);
        return [...pre, data];
      });
      setCurrentData({});
      setOpen(false);
    }
    else {
      console.log("Just fill in all fields.")
    }
    
  }

  const deleteProfileData = (id) => {
    const updatedData = profileData.filter((element) => profileData.indexOf(element) !== id);
    console.log(updatedData);
    setProfileData(updatedData);
  };

  //Current Editing Data
  const handleCurrentData = (data) => {
    console.log(data);
    setCurrentData(data);
  };

  const handleCheck = (check) => {
    if(currentData.data){
      const separatedata = { ...currentData };
      
      const updatedData = { data: { ...separatedata.data, isDownload: check }, type: "slideImage" };
      console.log(updatedData);
      setCurrentData(updatedData);
      setIsChecked(check);
    }
    else{
      console.log("First Upload please")
    }
  }

  //Current data clear
  const handleClear = () =>{
    setIsClear(true);
    setCurrentData({});
    setTimeout(()=>{
      setIsClear(false);
    }, 1000)
  }
  
  const handleModal = (e) =>{
    console.log(e.target.getAttribute('type'));
    setCreateType(e.target.getAttribute('type'));
    setOpen(true);
  }
  

  const handleClose = () => {
    setOpen(false);
  }


  //Update all publish data
  const updateAllForPublish = () => {
    let newOnlineCardData = {
      'dataLink' : [],
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
    };
    // console.log("newOnlineCardData-->", newOnlineCardData);
    for (const item in profileData) {
      // console.log(profileData[item].type);
      switch (profileData[item].type){
        case "oneImage":
          // console.log(newOnlineCardData.imgLink1);
          newOnlineCardData.imgLink1.push({
            title:profileData[item].data.title,
            text:profileData[item].data.text,
            url:profileData[item].data.imageLink,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "twoImage":
          newOnlineCardData.imgLink2.push({
            title1:profileData[item].data[0].title,
            text1:profileData[item].data[0].text,
            url1:profileData[item].data[0].imageLink,
            title2:profileData[item].data[1].title,
            text2:profileData[item].data[1].text,
            url2:profileData[item].data[1].imageLink,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "threeImage":
          newOnlineCardData.imgLink3.push({
            title1:profileData[item].data[0].title,
            text1:profileData[item].data[0].text,
            url1:profileData[item].data[0].imageLink,
            title2:profileData[item].data[1].title,
            text2:profileData[item].data[1].text,
            url2:profileData[item].data[1].imageLink,
            title3:profileData[item].data[2].title,
            text3:profileData[item].data[2].text,
            url3:profileData[item].data[2].imageLink,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "fourImage":
          newOnlineCardData.imgLink4.push({
            title1:profileData[item].data[0].title,
            text1:profileData[item].data[0].text,
            url1:profileData[item].data[0].imageLink,
            title2:profileData[item].data[1].title,
            text2:profileData[item].data[1].text,
            url2:profileData[item].data[1].imageLink,
            title3:profileData[item].data[2].title,
            text3:profileData[item].data[2].text,
            url3:profileData[item].data[2].imageLink,
            title4:profileData[item].data[3].title,
            text4:profileData[item].data[3].text,
            url4:profileData[item].data[3].imageLink,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "videoLink":
          newOnlineCardData.videoLink.push({
            url:profileData[item].data,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "text":
          newOnlineCardData.textLink.push({
            text:profileData[item].data,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "map":
          newOnlineCardData.mapLink.push({
            imgLink:'',
            mapLink:profileData[item].data,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "selfProfile":
          newOnlineCardData.selfProfile.push({
            title:profileData[item].data.title,
            content:profileData[item].data.text,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "slideImage":
          newOnlineCardData.slideLink.push({
            url:profileData[item].data.file,
            title:profileData[item].data.title,
            text:profileData[item].data.text,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "space":
          newOnlineCardData.spaceAdd.push({
            space:profileData[item].data,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;
        case "link":
          newOnlineCardData.dataLink.push({
            imgLink:profileData[item].data.iconLink,
            title:profileData[item].data.title,
            content:profileData[item].data.text,
            link:profileData[item].data.urlLink,
            order:profileData.indexOf(profileData[item]),
            size:1,
            startTime:"",
            endTime:""
          });
          break;

        default: break;
      }
    }

    setPublishData((pre)=>{  
      console.log("PublishData: ", {...pre, snsTree_Data:newOnlineCardData});
      return {...pre, snsTree_Data:newOnlineCardData}
    });
    
  }
  const handlePublish = async () => {
    updateAllForPublish();
    localStorage.setItem('avatar',publishData.faceImg);
    let completepublishData = {...publishData}
    completepublishData = {...completepublishData, url_name:publishLink};
    localStorage.setItem('urlName', publishLink);
    console.log(completepublishData);

    try {
      const response = await axios.put(
        `${myConfig.apiUrl}/social/private/snstree`,
        completepublishData,{
          headers:{Authorization: `token ${localStorage.getItem('token')}`}, //here I want to pass Bearer Token
        }
      );
      toast.success("Successfully published!");
      console.log("Response:------", response.data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
    setPublishData((pre)=>({...pre, url_name:publishLink}));
    setShowPublihModal(false);
  }

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
    setPublishData((pre)=>({...pre, bgColor:color.hex}));
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploaded_url = await FileUpload(file);
      setBackgroundImage(uploaded_url);
      setPublishData((pre)=>({...pre, bgURL:uploaded_url}));

    }
  };

	return (
		<div className="editSocial bg-gray-100" style={{ backgroundColor:backgroundColor, backgroundImage:backgroundImage!=='' ? `url(${backgroundImage})`:"", backgroundSize:"cover" }}>
			<div className="min-[960px]:w-[960px] max-[960px]:w-full fixed top-0 flex h-24 items-center justify-around bg-gray-100 z-10 shadow-sm">
        <Link to = "/online"><img src="/image/turn-left.png" alt="edit" className="w-[40px] h-[40px] cursor-pointer"></img></Link>
        <Link onClick={()=>setShowPublihModal(true)} className="px-4 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 active:bg-orange-600 focus:bg-orange-700 h-[37px] text-white text-[18px]">公開する</Link>
        <Link onClick={()=>{updateAllForPublish(); setShowPreviewModal(true)}} className="px-4 py-1 rounded-lg bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:bg-purple-800 h-[37px] text-white text-[18px]">プレビュー</Link>
        <Link to="/social" className="min-[440px]:px-4 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 active:bg-orange-600 focus:bg-orange-700 h-[37px] text-white max-[440px]:h-[25px] max-[440px]:px-2 max-[440px]:text-sm text-[18px]">ビジネス向け</Link>
      </div>
			
      <div className="min-w-[320px] w-[50%] mx-auto pt-1">
      <div className='p-[10px] flex justify-end mt-32'>
          <div onClick={() => {setOpenColorDialog(true)}} className='bg-red-400 inline-block cursor-pointer hover:bg-red-500 text-white mr-3 px-5 py-1 rounded-lg'>背景</div>
            <Link to ="/setting"><img className="w-[27px] h-[27px] cursor-pointer" alt="edit" src="/image/setting1.png"></img></Link>
        </div>
        {/* Color Dialog */}
        <Dialog open={openColorDialog} onClose={() => setOpenColorDialog(false)}>
          <DialogTitle>'背景を選択'</DialogTitle>
          <DialogContent>
            <ChromePicker color={backgroundColor} onChange={handleColorChange} disableAlpha={true}  />
          </DialogContent>
          <DialogActions>
            {
              (
                <div className='absolute left-4 bottom-3'>
                  <label htmlFor="background-upload">
                    <div className="w-[40px] h-[40px] rounded-full bg-gray-200 overflow-hidden relative cursor-pointer">
                      {backgroundImage ? (
                        <img
                          src={backgroundImage}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-full h-full text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >              
                          <line x1="12" y1="10" x2="12" y2="14" />
                          <line x1="10" y1="12" x2="14" y2="12" />
                        </svg>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="background-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {
                    backgroundImage !== "" && (
                      <div className='absolute top-2 -right-6 cursor-pointer' onClick={() => {setBackgroundImage("")}}>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.91498 15.4949L9.03117 11.3182L4.7256 7.07504L7.01035 4.75666L11.3159 8.99978L15.4321 4.823L17.8609 7.21656L13.7447 11.3933L18.0503 15.6365L15.7655 17.9548L11.46 13.7117L7.34376 17.8885L4.91498 15.4949Z" fill="black" fillOpacity="0.3"/>
                        </svg>
                      </div>
                    )
                  }
                  
                </div>
              )
            }
            <Button onClick={() => setOpenColorDialog(false)}>はい</Button>
          </DialogActions>
        </Dialog>
        <ImageSlider onChangeData={(data)=>{setPublishData((pre)=>({...pre, idCard:{idCard:data}}))}} />
        <div className="flex flex-col justify-center -mt-[85px] mb-[40px] items-center">
          <AvatarUploader onChangeData = {(data)=>{setPublishData((pre)=>({...pre, faceImg:data}))}} />
          <input type="text" onChange={(e)=>{setPublishData((pre)=>({...pre, accountName:e.target.value}))}} placeholder="アカウント名" className='border rounded-lg p-3 my-4 text-lg w-[70%]' />
          <input type="text" onChange={(e)=>{setPublishData((pre)=>({...pre, profile:e.target.value}))}} placeholder="プロフィール" className='border rounded-lg p-3 text-lg w-[70%]' />
				</div>
        {/* <DraggableForm /> */}
        <DndProvider backend={HTML5Backend}>
          { 
            profileData && profileData.map((item, index) =>(
              <Listcomponent key = {index} id = {index} index={index} profileListData={item} moveItem={moveItem} isDelete = {deleteProfileData} />
            ))
          }
        </DndProvider>
        <div className="mt-[40px]">
          {
            profileButton.map((item, key)=>(
              <div key={key} type={item.type} className="p-3 px-5 border rounded-md my-3 cursor-pointer border-black text-black/30 hover:text-black" onClick={handleModal} >{item.placeholder}</div>
            ))
          }
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        keepMounted 
        className="w-full flex justify-center items-center"
      >
        <div className="w-[40%] aspect-[16/9] max-[960px]:w-[50%] max-[640px]:w-[320px] rounded-lg p-[20px] bg-white items-center">
          {createType==="fourImage" && (
            <Fourimagelink FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
          )}
          {createType==="threeImage" && (
            <Threeimagelink FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
          )}
          {createType==="twoImage" && (
            <Twoimagelink FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
          )}
          {
            createType==="oneImage" && (
              <Oneimagelink FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
            )
          }
          {
            createType==="videoLink" &&(
              <Videolinkitem FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
            )
          }
          {
            createType==="text" &&(
              <TextEditor FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
            )
          }
          {
            createType==="map" && (
              <Map FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
            )
          }
          {
            createType==="link" && (
              <div className="relative">
                <Linkitem FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
              </div>
            )
          }
          {
            createType==="space" && (
              <Spaceitem FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
            )
          }
          {
            createType==="selfProfile" && (
              <Selfprofile FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
            )
          }
          {
            createType==="slideImage" && (
              <div className="w-full">
                <PdfReader FileUpload={FileUpload} isClear = {isClear} onChangeData={handleCurrentData} />
                <label htmlFor="download"><input type="checkbox" id="download" name="download" checked={isChecked} onChange={() => {setIsChecked(!isChecked); handleCheck(!isChecked)}} />allow download</label>
              </div>
            )
          }
          <div className="flex justify-end gap-x-4 mt-auto">
            <img alt="trash" src="/image/trash.svg" width="30" className="cursor-pointer hover:opacity-70" onClick={handleClear}/>
            <div className="rounded-md py-2 px-4 bg-sky-400 text-white cursor-pointer hover:bg-sky-500" onClick={() =>{handleProfileData(currentData)}}>保存</div>
            <div className="rounded-md py-2 px-4 bg-red-400 text-white cursor-pointer hover:bg-red-500" onClick={()=>{setArrangementOpen(true)}}>予約</div>
          </div>
          {
            arrangementOpen && (
              <div className="absolute flex w-full h-full bg-black/70 top-0 left-0 justify-center items-center">
                <div className="w-[400px] h-[300px] flex flex-col items-center mx-auto shadow rounded-md bg-white">
                  <div className="w-full flex justify-between items-center p-2 bg-slate-400 mb-10 rounded-t-md">
                    <h2 className="font-extrabold text-lg">予約設定</h2>
                    <div className="w-[20px] h-[20px] aspect-square bg-cover cursor-pointer" style={{backgroundImage:'url("image/close.svg")'}} onClick={()=>setArrangementOpen(false)}></div> 
                  </div>            
                  <div>
                    <h2>公開日時</h2>
                    <Datetimepicker />
                  </div>
                  <div>
                    <h2>終了日時</h2>
                    <Datetimepicker />
                  </div>
                  <div className="flex gap-3 mt-3">
                    <div className="w-36 bg-green-500 text-center hover:opacity-80 text-white py-1 cursor-pointer">すぐに予約する</div>
                    <div className="w-36 bg-blue-600 text-center hover:opacity-80 text-white py-1 cursor-pointer">予約を設定</div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Modal>
      <TEModal show={showPublihModal} setShow={setShowPublihModal} >
        <TEModalDialog
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TEModalContent style={{width:"400px"}}>
            <TEModalHeader style={{backgroundColor:"#38bdf8"}}>
              <h1 className="text-2xl p-3 text-white">公開アドラスを入力！</h1>
              <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowPublihModal(false)}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="grey"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div className='w-full flex justify-center relative flex-col'>
                <label >公開アドレス</label>
                <label htmlFor="publicLink" className="absolute top-1/2 left-4 text-neutral-500">http://192.168.142.178:3000/</label>
                <input value={publishLink} onChange={(e)=>setPublishLink(e.target.value)} type="text" id="publicLink" className="border py-2 rounded-full pl-[230px]"/>
              </div>
              <div className='flex justify-center mt-10 mb-5' >
                <TERipple>
                  <button type="button" className='px-5 py-2 rounded-full bg-green-500 cursor-pointer text-white' onClick={handlePublish} >確 認</button>
                </TERipple>
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
      <TEModal show={showPreviewModal} setShow={setShowPreviewModal} >
        <TEModalDialog
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translate(-50%, 0%)",
            overflow:"auto"
          }}
        >
          <TEModalContent style={{width:"480px"}}>
            <TEModalHeader style={{backgroundColor:"#38bdf8"}}>
              <h1 className="text-2xl p-3 text-white">プレビュー</h1>
              <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowPreviewModal(false)}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="grey"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <PublicViewSocial publishData={publishData} />
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
		</div>
	)
}

export default EditSocial;