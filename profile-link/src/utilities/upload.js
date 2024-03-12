//Cloudinary upload
import {toast} from "react-toastify";

export const FileUpload = async (file) => {
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
