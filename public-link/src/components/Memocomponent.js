import React, { useState, useEffect, useRef } from 'react';

export default function MemoComponent(){
  const [showPane, setShowPane] = useState(false);
  const [content, setContent] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setShowPane(!showPane);
    // Add logic to set the content and last updated time
  };

  const handleUpdateClick = () => {
    // Add logic to handle the update button click
    setLastUpdated(new Date().toLocaleString());
    setShowPane(false);
  };

  const handleCancelClick = () => {
    setShowPane(false);
    // Add logic to reset the content and last updated time
    setContent('');
    setLastUpdated('');
  };

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPane(false); // Hide the dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div ref={dropdownRef}>
      <button onClick={handleButtonClick}>
        <img alt="edit memo" src="/image/edit-memo.png" width="20" height="20" />
      </button>
      {showPane && (
        <div className='absolute transform -translate-y-[100%] bg-slate-200 top-0 right-0 p-2 rounded-md'>
          <div className='relative'>
            <textarea
              className='w-full block rounded-md p-2'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {lastUpdated && <p>{lastUpdated}</p>}
            <button className='mx-[20px] mt-2 p-1 px-4 hover:opacity-70 rounded-full border-blue-500 border-2 text-blue-500' onClick={handleUpdateClick}>更新</button>
            <button className='mx-[20px] mt-2 p-1 px-4 hover:opacity-70 rounded-full border-red-500 border-2 text-red-500' onClick={handleCancelClick}>キャンセル</button>
          </div>
        </div>
      )}
    </div>
  );
};