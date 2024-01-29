import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dropdownRef = useRef(null);
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
    <div className="Dashboard">
      {/* <div>
            </div> */}
      <div className="selectiveBackground">
        <Link to="/dashboard" ><img src="/image/turn-left.png" alt="return" className="w-[40px] h-[60px] cursor-pointer ml-5 pt-5"></img></Link>
      </div>
      <div className="mainUserInfo">
        <div className="userImage">
          <img className="userAvatar bg-white" alt="userAvatar" src={localStorage.getItem('avatar') !== 'null' ? localStorage.getItem('avatar') : '/image/user_default.png'}></img>
        </div>
        <div className="userInformation">
          <div className="userName">
            {localStorage.getItem('username')}
          </div>
          <div className="userEmail">
            {localStorage.getItem('email')}
          </div>
        </div>
      </div>
      <div className="alarmPart">
        <img alt="alarm" src="/image/alarm.png" id="alarm"></img>
        <div className='alarmBadge'></div>
        <div className="downBar" ref={dropdownRef} >
          <img alt="contactLists" src="/image/contactLists.png" id="contactLists" onClick={toggleDropdown}></img>
          {isOpen && (
            <div className="downList mt-[10px]">
              <div className="unannouncedList list"><Link className="listLink" to="/layout/list/nocontactlist" onClick={() => { setIsOpen(false) }}>非通知一覧</Link></div>
              <div className="blockList list"><Link className="listLink" to="/layout/list/blocklist" onClick={() => { setIsOpen(false) }}>ブロック一覧</Link></div>
              <div className="deleteList list"><Link className="listLink" to="/layout/list/deletedlist" onClick={() => { setIsOpen(false) }}>削除一覧</Link></div>
            </div>
          )}
        </div>
      </div>
      <div className='px-[70px] max-[400px]:mt-[210px]'>
        <Outlet />
      </div>
    </div>
  )
}
