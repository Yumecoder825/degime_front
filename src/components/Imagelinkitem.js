import React, {useState, useEffect} from 'react'

export default function Imagelinkitem({FileUpload, id, isClear, onChangeState}) {
  const [image, setImage] = useState("/image/imagelink.png");
  const [state, setState] = useState({
    imageLink: '',
    title: '',
    text: '',
    url: '',
    id:0,
  });

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const uploadedImages = Array.from(event.target.files);
    const lastImage = uploadedImages[uploadedImages.length - 1];
    if (lastImage) {
      try {
        const lastImageUrl = URL.createObjectURL(lastImage);
        setImage(lastImageUrl);
        const uploaded_url = await FileUpload(lastImage);
        console.log("Uploaded_url", uploaded_url);
        setState({ ...state, imageLink: uploaded_url, id:id });
        onChangeState({ ...state, imageLink: uploaded_url, id:id });
        event.target.value = null;
        return () => URL.revokeObjectURL(lastImageUrl);
      } catch (error) {
        console.error('Error creating object URL:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  useEffect(()=>{
    if(isClear){
      setImage('');
      setState({
        imageLink: '',
        title: '',
        text: '',
        url: '',
        id:0,
      });
    }
  }, [isClear])
  return (
    <div>
      <div className="relative w-full aspect-[16/9] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${image})`,backgroundSize:"cover"}}>            
        <input
          type="file"
          accept="image/*"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          name="image-upload"
          onChange={handleImageUpload}
        />
      </div>
      <input className='w-full text-sm border border-black rounded-md p-2 px-3 my-1 mt-2' name="link-1" placeholder='タイトル' value={state.title} onChange={(e) =>{setState({ ...state, title: e.target.value, id:id }); onChangeState({ ...state, title: e.target.value, id:id }) }} />
      <input className='w-full text-sm border border-black rounded-md p-2 px-3 my-1' name="link-2" placeholder='テキスト' value={state.text} onChange={(e) =>{setState({ ...state, text: e.target.value, id:id }); onChangeState({ ...state, text: e.target.value, id:id }) }} />
      <input className='w-full text-sm border border-black rounded-md p-2 px-3 my-1 mb-2' name="link-3" placeholder='URL' value={state.url} onChange={(e) =>{setState({ ...state, url: e.target.value, id:id }); onChangeState({ ...state, url: e.target.value, id:id }) }} />
    </div>
  )
}
