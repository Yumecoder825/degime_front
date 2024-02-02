import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';


export default function InputLinkItem({id, isClear, onChangeData}) {
  // State to hold the selected link type (Youtube, Instagram, etc.)
  const [selectedLinkType, setSelectedLinkType] = useState('');
  const [urlLink, setUrlLink] = useState('');
  // State to control the visibility of link icons and URL input
  const [isLinkIconsVisible, setLinkIconsVisible] = useState(false);
  const [isUrlInputVisible, setUrlInputVisible] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownIconRef = useRef(null);
  const [selectedLinkIcon, setSelectedLinkIcon] = useState(null);

  useEffect(()=>{
    if(isClear){
      setSelectedLinkIcon(null);
      setSelectedLinkType('');
      setUrlLink('');
    }
  }, [isClear])
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLinkIconsVisible(false); // Hide the dropdown
      }
      if (dropdownIconRef.current && !dropdownIconRef.current.contains(event.target)) {
        setUrlInputVisible(false); // Hide the dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const upload_url = await FileUpload(file);
      setSelectedLinkIcon(upload_url);
    }

    setUrlInputVisible(true);
    setLinkIconsVisible(false);
  };
  // Function to handle icon click (Plus icon click)
  const toggleLinkIconsVisibility = () => {
    setLinkIconsVisible(!isLinkIconsVisible);
    // Hide URL input if it's visible when link icons are toggled
    if (isUrlInputVisible) setUrlInputVisible(false);
  };

  // Function to handle selection of a link icon
  const selectLinkType = (linkType) => {
    setSelectedLinkType(linkType);
    setSelectedLinkIcon(null);
    setUrlInputVisible(true); // Show URL input upon selecting a link type
  };

  // Function to handle saving the URL (for demo purposes)
  const saveLink = () => {
    const iconLink = selectedLinkIcon ? selectedLinkIcon : selectedLinkType ? getImageSrc(selectedLinkType) : "/image/plus.png"
    onChangeData({iconLink: iconLink, urlLink:urlLink, id:id, title:selectedLinkType});
    // You can add logic here to actually save the link
    setUrlInputVisible(false);
    setLinkIconsVisible(false);
  };

  // Helper function to generate image src based on link type
  const getImageSrc = (linkType) => `/image/${linkType.toLowerCase()}.png`;

  // List of available link types
  const linkTypes = ['Youtube', 'Instagram', 'Tiktok', 'Pinterest', 'Linkedin', 'Facebook', 'Googleplus', 'Line', 'Mail', 'Twitter'];

  return (
    <div>
      {/* Plus icon */}
      <img
        className="w-[50px] h-[50px] max-[800px]:w-[40px] max-[800px]:h-[40px] cursor-pointer"
        src={selectedLinkIcon ? selectedLinkIcon : selectedLinkType ? getImageSrc(selectedLinkType) : "/image/plus.png"}
        alt="edit"
        onClick={toggleLinkIconsVisibility}
      />
      { isLinkIconsVisible &&
        <div className={`absolute top-[120px] right-0 gap-3 pt-[40px] p-[20px] rounded-md border-2 border-black flex w-[340px] h-auto flex-wrap bg-white z-10`} ref={dropdownRef}>
          {/* Close Icon, shown when link icons or URL input are visible */}

            <img
              className="absolute closeIcon w-[30px] h-[30px] cursor-pointer right-[10px] top-2"
              src="/image/close.png"
              alt="close"
              onClick={()=>{setLinkIconsVisible(false); setUrlInputVisible(false)}}
            />

          {isLinkIconsVisible && linkTypes.map((type) => (
            <img
              key={type}
              className="w-[40px] h-[40px] cursor-pointer"
              id={type}
              alt={type}
              src={getImageSrc(type)}
              onClick={() => {selectLinkType(type); setLinkIconsVisible(false)}}
            />
          ))}
          {
            isLinkIconsVisible && (
              <div className='absolute right-4 bottom-5'>
                <label htmlFor="icon-upload">
                  <div className="w-[40px] h-[40px] overflow-hidden relative cursor-pointer">
                    <svg
                      className="w-full h-full text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="square"
                      strokeLinejoin="square"
                    >              
                      <line x1="20" y1="10" x2="20" y2="30" />
                      <line x1="10" y1="20" x2="30" y2="20" />
                    </svg>
                  </div>
                </label>
                <input
                  type="file"
                  id="icon-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            )
          }

        </div>
      }

      {/* URL Input, shown when a link type is selected */}
      {isUrlInputVisible && (
        <div className='w-[350px] h-[200px] absolute top-[120px] right-0 p-4 px-[40px] bg-white border-2 border-black rounded-md z-10' ref={dropdownIconRef} >
          <img
            className="ml-auto closeIcon w-[30px] h-[30px] cursor-pointer mb-2 mt-0"
            src="/image/close.png"
            alt="close"
            onClick={toggleLinkIconsVisibility}
          />
          <input type="text" value={selectedLinkType} onChange={(e)=>{!linkTypes.includes(selectedLinkType) && setSelectedLinkType(e.target.value)}} placeholder="タイトル" className='border rounded-md px-2 py-1 mb-3 block w-full' />
          <input
            type="text"
            placeholder="URL設定"
            className='border rounded-md px-2 py-1 mb-3 block w-full'
            value={urlLink}
            onChange ={(e) =>setUrlLink(e.target.value)}
          />
          <button
            className="urlSelectionCheck bg-orange-400 hover:bg-orange-500 px-4 py-1 rounded-md text-white cursor-pointer ml-[180px]"
            onClick={saveLink}
          >
            保存
          </button>
        </div>
      )}
    </div>
  );
}
