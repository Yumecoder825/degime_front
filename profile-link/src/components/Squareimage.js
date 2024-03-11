import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ImageSlider = ({ onChangeData }) => {
  const [images, setImages] = useState([]);
  const [lastImage, setLastImages] = useState("/image/Carousel.png");
  //Cloudinary upload
  const FileUpload = async (file) => {
    const cloud_name = "dz6r3o4w0";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dfuqz9xv");
    formData.append("cloud_name", cloud_name);

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dz6r3o4w0/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleImageUpload = async (event) => {
    const uploadedImages = event.target.files[0];
    if (uploadedImages) {
      try {
        console.log(uploadedImages);
        const lastImageUrl = await FileUpload(uploadedImages);

        const imageList = [...images];
        imageList.push(lastImageUrl);
        console.log(imageList);
        onChangeData(imageList);
        setImages(imageList);
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      // Assuming setLastImages is a function in your component's state,
      // create an object URL for the last image and pass it to setLastImages.
      const lastImageUrl = images[images.length - 1];
      setLastImages(lastImageUrl);
    }
  }, [images]);

  return (
    <div className="squareUploader min-w-[335px] w-full h-full mx-auto mb-3">
      <div
        className="relative min-w-[335px] w-full aspect-[4/3] rounded-lg border-indigo-700 border-2 overflow-hidden mx-auto"
      >
        <img
            src={lastImage}
            className="w-full h-full object-contain"
            alt=""
        />
        <input
          type="file"
          accept="image/*"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          name="image-upload"
          onChange={handleImageUpload}
        />
        {images.length > 0 && (
          <div className="flex items-center justify-between absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`carousel-${index}`}
                className="w-12 h-12 object-cover rounded-full cursor-pointer"
                onClick={() => {
                  setLastImages(image);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
