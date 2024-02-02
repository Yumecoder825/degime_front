import React, { useState, useRef, useEffect } from "react";
import Contactitem from "../components/Contactitem_1";
import { Link } from "react-router-dom";
import Modal from "../components/Newfoldermodal";

import axios from "axios";
import { myConfig } from "../utilities/config";
import { toast } from "react-toastify";

export default function ContactList({ blockList, noContactList, deletedList }) {
  const [navTab, setNavTab] = useState([{title:"Business", id:0, badge:2}, {title:"Private", id:1, badge:6}]);
  const [isActive, setIsActive] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isModify, setIsModify] = useState("");
  const [contactList, setContactList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleFolder = (folderName) => {
    const folders = [...navTab];
    if(folderName.type === "create"){
      folders.push({title:folderName.content, id:folders.length, badge:4});
      setNavTab(folders);
    }
    else if(folderName.type === "modify"){
      folders[isActive].title = folderName.content;
      setNavTab(folders);
    }
    else if(folderName.type === "delete"){
      const updatedData = folders.filter((element) => folders.indexOf(element) !== isActive);
      setNavTab(updatedData);
    }
  }

  const getDatafromDatabase = async (groupName) =>{
    try {
      const response = await axios.get(
        `${myConfig.apiUrl}/social/private/contactdata?group_Name=${groupName}`,
        {
          headers:{Authorization: `token ${localStorage.getItem('token')}`}, //here I want to pass Bearer Token
        }
      );
      // console.log("ShowData: ", response.data[0]);
      const contactData = response.data.filter((item)=>item.block_setting === "None");
      console.log("contactData: ", contactData);
      setContactList(contactData);
      
      return response.data;
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

  
  useEffect(()=>{
    getDatafromDatabase(navTab[isActive].title);
  }, [isActive, navTab]);

  

  // Slide page
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(navTab.length / itemsPerPage);

  const visibleItems = navTab.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

  const handleNextPage = () => {
    const newActive = ((currentPage + 1) % totalPages) * itemsPerPage;
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    console.log(newActive);

    setIsActive(newActive);
  };

  const handlePrevPage = () => {
    const newActive = ((currentPage + 1) % totalPages) * itemsPerPage;
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    console.log(newActive);
    setIsActive(newActive);
  };

  // handle Click outside of menu
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Hide the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  


  return (
    <>
      <div className="flex">
        <Link to ="/dashboard"><img src="/image/turn-left.png" alt="return" className="w-[40px] h-[60px] cursor-pointer ml-5 pt-5"></img></Link>
        <div className="alarmPart">
          <img alt="alarm" src="/image/alarm.png" id="alarm"></img>
          <div className='alarmBadge'></div>
          <div className="downBar" ref={dropdownRef} >
            <img alt="contactLists" src="/image/contactLists.png" id="contactLists" onClick={toggleDropdown}></img>
            {isOpen && (
              <div className="downList mt-[10px]">
                <div className="unannouncedList list"><Link className="listLink" onClick={()=>{setIsShowModal(true); setIsOpen(false); setInterval(()=>{setIsShowModal(false); clearInterval()}, 2000)}}>フォルダー作成</Link></div>
                <div className="blockList list"><Link className="listLink" onClick={()=>{setIsShowModal(true); setIsModify(navTab[isActive].title); setIsOpen(false); setInterval(()=>{setIsShowModal(false); setIsModify(""); clearInterval()}, 2000)}}>フォルダー名修正</Link></div>
                <div className="deleteList list"><Link className="listLink" onClick={()=>{setIsShowModal(true); setIsModify(navTab[isActive].title); setIsOpen(false); setInterval(()=>{setIsShowModal(false); setIsModify(""); clearInterval()}, 2000)}}>フォルダー削除</Link></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto">
        <span className="max-[700px]:w-full w-[560px] flex mt-[50px] mx-auto mb-[35px] bg-zinc-300 items-center justify-center h-[40px] button">
          <div id="searchIcon" className="flex justify-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0635 18.9371C14.9388 20.5885 12.2648 21.3676 9.58605 21.1157C6.90731 20.8638 4.42524 19.5999 2.64524 17.5813C0.865234 15.5627 -0.0788693 12.9412 0.00516452 10.2506C0.0891983 7.55999 1.19505 5.0026 3.09755 3.09913C5.00005 1.19566 7.55615 0.0892437 10.2454 0.00516714C12.9346 -0.0789094 15.5548 0.865674 17.5723 2.64658C19.5899 4.4275 20.8532 6.91082 21.105 9.59092C21.3567 12.271 20.5781 14.9464 18.9275 17.0722L26 24.1219L24.1228 26L17.0768 18.9371H17.0635ZM10.5859 18.5139C11.6276 18.5139 12.659 18.3086 13.6213 17.9098C14.5836 17.511 15.458 16.9265 16.1945 16.1896C16.9311 15.4526 17.5153 14.5778 17.9139 13.615C18.3125 12.6522 18.5177 11.6202 18.5177 10.5781C18.5177 9.53595 18.3125 8.50401 17.9139 7.5412C17.5153 6.57838 16.9311 5.70355 16.1945 4.96664C15.458 4.22973 14.5836 3.64518 13.6213 3.24637C12.659 2.84756 11.6276 2.6423 10.5859 2.6423C8.4823 2.6423 6.46483 3.47839 4.97733 4.96664C3.48984 6.45489 2.65417 8.47339 2.65417 10.5781C2.65417 12.6828 3.48984 14.7013 4.97733 16.1896C6.46483 17.6778 8.4823 18.5139 10.5859 18.5139Z"
                fill="white"
              />
            </svg>
          </div>
          <div id="stick"></div>
          <input type="text" className="searchInput" placeholder="検索"></input>
          <div id="deleteIcon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 0C4.917 0 0 4.917 0 11C0 17.083 4.917 22 11 22C17.083 22 22 17.083 22 11C22 4.917 17.083 0 11 0ZM16.5 14.949L14.949 16.5L11 12.551L7.051 16.5L5.5 14.949L9.449 11L5.5 7.051L7.051 5.5L11 9.449L14.949 5.5L16.5 7.051L12.551 11L16.5 14.949Z"
                fill="#F8F8F8"
              />
            </svg>
          </div>
        </span>
        <div className="relative">
          <ul className="w-full justify-around flex gap-y-3 mb-5 overflow-hidden">
            {visibleItems.map((item, index) => (
              <li
                key={index}
                className={`text-xl mt-3 text-center font-extrabold h-30 w-150 cursor-pointer ${
                  isActive === index + currentPage * itemsPerPage ? "text-blue-700 border-b-2 border-blue-700" : "text-slate-600"
                }`}
                onClick={() => {
                  setIsActive(index + currentPage * itemsPerPage);
                }}
              >
                {item.title}<div className="bg-amber-300 text-red-600 text-sm w-[20px] h-[20px] inline-block rounded-full">{item.badge}</div>
              </li>
            ))}
          </ul>
          {totalPages > 1 && (
            <div>
              <button className="absolute top-1/2 left-0" onClick={handlePrevPage}><img src="/image/left-arrow.png" width="15" height="15" alt="left" /></button>
              <button className="absolute top-1/2 right-0" onClick={handleNextPage}><img src="/image/right-arrow.png" width="15" height="15" alt="right" /></button>
            </div>
          )}
        </div>
        <ul className="p-6 divide-y divide-sky-700">
          {contactList.length>0 &&
            contactList.map((person, index) => (
              <Contactitem
                key={index}
                url={person.member_avatar || "/image/user_default.png"}
                username={person.member}
                email={person.member_email}
                is_new={person.is_new || false}
                id={isActive}
              />
            ))}
        </ul>
        <Modal onChangeName={handleFolder} isShow={isShowModal} isModify = {isModify}/>
      </div>

    </>
  );
}
