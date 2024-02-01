import React, {useState, useEffect} from 'react';

export default function Chatitem({url, username, content, is_online, date, isCreateShow, isTrashShow, tab, id, isSelectedState, isLongPressedState}) {
  const [isSelected, setisSelected] = useState(false);
  const [isShow, setIsShow] = useState(false);
  let timer;
  const handleSelect = () => {
    if ((tab && isTrashShow) || (tab && isCreateShow)) {
      isSelectedState(id);
      isShow && setisSelected((pre)=>!pre);
    }
  }
  const handleMouseDown = () => {
    if(tab){
      timer = setTimeout(() => {
        isLongPressedState(true);
      }, 1000);
    }
  };

  const handleMouseUp = () => {
    (tab) &&
    clearTimeout(timer);
  };

  useEffect(() => {
    if (tab){
      if(isTrashShow || isCreateShow) {
        setIsShow(true);
      }
      else {
        setIsShow(false);
        setisSelected(false);
      }
    }

  }, [isTrashShow, isCreateShow, tab])

  useEffect(() => {

    return () => {
      clearTimeout(timer);
    };
  }, [timer]);
  return (
    <>
      <li className="flex py-5 first:pt-0 last:pb-0 items-center cursor-pointer hover:opacity-80 active:opacity-90" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={handleSelect}>
        <div className='relative'>
          <img className="rounded-full" width="60" height="60" src={url} alt={`${username}-avatar`} />
          <div className={`absolute bottom-1 right-1 w-[15px] h-[15px] rounded-full ${is_online === 2 ? 'bg-green-500' : is_online === 1 ? 'bg-amber-300' : 'bg-red-500'} `}></div>
        </div>
        <div className="max-[350px]:ml-3 min-[350px]:ml-10 w-[35%] overflow-hidden">
            <p className="text-xl font-medium text-slate-900">{username}</p>
            <p className="text-md text-slate-900 truncate mt-3">{content}</p>
            <p className="text-sm text-slate-900 truncate ml-2">{date}</p>
        </div>
        {
          isShow && (
            <div className='ml-auto'>
              {
                !isSelected ?
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="8.75" stroke="#777777" strokeWidth="0.5"/>
                  </svg>
                : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="9" fill="#4C31F4"/>
                    <line x1="3.35355" y1="9.64645" x2="7.35355" y2="13.6464" stroke="white"/>
                    <line x1="6.64645" y1="13.6464" x2="14.6464" y2="5.64645" stroke="white"/>
                  </svg>
              }
            </div>
          )
        }
        {
          tab === 0 && <div className='max-[620px]:px-1 min-[620px]:px-5 py-2 text-white ml-auto rounded-lg bg-red-400'>承認中</div>
        }

      </li>
    </>
  )
}
