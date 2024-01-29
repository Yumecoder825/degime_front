import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AvatarUploader = ({onChangeData}) => {
  const [selectedImage, setSelectedImage] = useState(null);

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
      setSelectedImage(upload_url);
      onChangeData(upload_url);
    }
  };

//   const handleCircleClick = () => {
//     // Open the library or do something else when the circle is clicked
//   };
  return (
    <div>
      <label htmlFor="image-upload">
        <div className="w-[150px] h-[150px] max-[800px]:w-[110px] max-[800px]:h-[110px] rounded-full bg-gray-200 overflow-hidden relative cursor-pointer">
          {selectedImage ? (
            <img
              src={selectedImage}
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
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default AvatarUploader;