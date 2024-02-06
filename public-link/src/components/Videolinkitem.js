import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function Videolinkitem({FileUpload, isClear, onChangeData}) {
  // const [videoUrl, setVideoUrl] = useState('');
  const [video, setVideo] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const handleVideoUpload = async (event) => {
    event.preventDefault();
    const uploadedVideo = event.target.files[0];
    if (uploadedVideo) {
      try {
        const lastVideoUrl = URL.createObjectURL(uploadedVideo);
        console.log(lastVideoUrl);
        const upload_url = await FileUpload(uploadedVideo);
        setVideo(upload_url);
        onChangeData({data:upload_url, type:"videoLink"});
        event.target.value=null;
        return () => URL.revokeObjectURL(lastVideoUrl);
      } catch (error) {
        console.error('Error creating object URL:', error);
      }
    } else {
      console.error('No file selected');
    }
  };
  const handlePlaying = () => {
    setIsPlaying((pre) => !pre);
  }
  const handleInputChange = (event) => {
    setVideo(event.target.value);
  };

  useEffect(()=>{
    if (isClear){
      setVideo("");
    }  
  },[isClear])
  return (
    <div>
      <div className="relative w-full aspect-video rounded-lg border-black border-2 overflow-hidden mx-auto">
        <input
          type="file"
          accept="video/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          name="video-upload"
          onChange={handleVideoUpload}
        />
        {video && <ReactPlayer url={video} playing={isPlaying} width="100%" height="auto" onClick={()=>{handlePlaying()}} />}
      </div>
      <input type="text" value={video} onChange={handleInputChange} />
    </div>
  );
}

export default Videolinkitem;
