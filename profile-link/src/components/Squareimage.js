import React, {useState, useEffect} from "react";
import {Close} from "@mui/icons-material";
import {FileUpload} from "../utilities/upload";
import {CircularProgress} from "@mui/material";

const ImageSlider = ({onChangeData}) => {
    const [images, setImages] = useState([]);
    const [lastImageIndex, setLastImageIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (event) => {
        const uploadedImages = event.target.files[0];
        if (uploadedImages) {
            try {
                setLoading(true);
                const lastImageUrl = await FileUpload(uploadedImages);

                const imageList = [...images];
                imageList.push(lastImageUrl);

                onChangeData(imageList);
                setImages(imageList);
                setLoading(false);
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
            setLastImageIndex(images.length - 1);
        }
    }, [images]);

    return (
        <div className="squareUploader min-w-[335px] w-full h-full mx-auto mb-3">
            <div
                className="relative min-w-[335px] w-full aspect-[4/3] rounded-lg border-white bg-white border-2 overflow-hidden mx-auto"
            >
                <img
                    src={lastImageIndex != null ? images[lastImageIndex] : "/image/Carousel.png"}
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
                {
                    lastImageIndex != null &&
                    <Close className="absolute right-4 top-4 cursor-pointer z-100"
                           onClick={() => {
                               const newImages = images.slice(0, lastImageIndex).concat(images.slice(lastImageIndex + 1));
                               setImages(newImages);
                               if (newImages.length === 0) {
                                   setLastImageIndex(null);
                               }
                           }}/>
                }
                {images.length > 1 && (
                    <div
                        className="flex items-center justify-start absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 gap-1">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`carousel-${index}`}
                                className="w-12 h-12 object-cover rounded-full cursor-pointer"
                                onClick={() => {
                                    setLastImageIndex(index);
                                }}
                            />
                        ))}
                    </div>
                )}
                {
                    loading &&
                    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center z-1000">
                        <CircularProgress />
                    </div>
                }
            </div>
        </div>
    );
};

export default ImageSlider;
