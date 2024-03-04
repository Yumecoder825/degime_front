import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ChromePicker } from 'react-color';  // Import ChromePicker from react-color
import { toast } from 'react-toastify';

// Define the draggable item component
const DraggableItem = ({ id, content, onChangeData, index, moveItem, fontColor }) => {
  const [inputValue, setInputValue] = useState("");
  const setValue = (e) =>{
    e.preventDefault();
    onChangeData({id:id, value:e.target.value});
    setInputValue(e.target.value);
  }
  const [, ref] = useDrag({
    type: 'ITEM',
    item: { id, index },
  });
  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div className='relative'>
      <input autoComplete='off' ref={(node) => ref(drop(node))} name={index} value={inputValue} onChange={(e)=>{setValue(e)}} className='cursor-grab active:cursor-grabbing bg-transparent rounded-md dark:text-white w-[96%]' style={{ margin: '8px', border: '1px solid #ccc', padding: '8px', color:fontColor }} placeholder={content} />
      <div className='absolute top-4 right-4 cursor-pointer' onClick={() => setInputValue("")}>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.91498 15.4949L9.03117 11.3182L4.7256 7.07504L7.01035 4.75666L11.3159 8.99978L15.4321 4.823L17.8609 7.21656L13.7447 11.3933L18.0503 15.6365L15.7655 17.9548L11.46 13.7117L7.34376 17.8885L4.91498 15.4949Z" fill="black" fillOpacity="0.3"/>
        </svg>
      </div>
    </div>
  );
};

// Define the main component
const DraggableList = ({onChangeData}) => {
  const [fontColor, setFontColor] = useState("#000");
  const [backgroundColor, setBackgroundColor] = useState("#f3f4f6");
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isFontColor, setIsFontColor] = useState(true);
  const [valueState, setValueState] = useState({
    company_url : '',
    companyName : '',
    position : '',
    phoneNumber : '',
    mobilePhoneNumber : '',
    mailAddress : '',
    address : '',
    cardColor: '',
    cardURL : '',
    wordColor : '',
  })

  // Update the value state ---important hhh----
  const handleValueState = (data) => {
    let newState = { ...valueState };
    newState[data.id] = data.value;
    newState.cardColor = backgroundColor;
    newState.cardURL = backgroundImage;
    newState.wordColor = fontColor;
    console.log("NewState:", newState);
    onChangeData(newState);
    setValueState(newState);
  };

  // Your initial items
  const defaultItems = [
    { id: 'company_url', content: '会社URL' },
    { id: 'companyName', content: '会社名' },
    { id: 'position', content: '役職' },
    { id: 'phoneNumber', content: '電話番号' },
    { id: 'mobilePhoneNumber', content: '携帯電話番号' },
    { id: 'mailAddress', content: 'メールアドレス' },
    { id: 'address', content: '住所' }
  ];
  const [items, setItems] = useState(defaultItems);

  const handleColorChange = (color) => {
    if (!isFontColor){
      setBackgroundColor(color.hex);
      onChangeData({...valueState, cardColor:color.hex});
    } 
    else{
      setFontColor(color.hex);
      onChangeData({...valueState, wordColor:color.hex});
    }
  };
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };
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
      const uploaded_url = await FileUpload(file);
      onChangeData({...valueState, cardURL:uploaded_url});
      setBackgroundImage(uploaded_url);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='p-[10px] flex justify-end'>
        <div onClick={() => {setOpenColorDialog(true); setIsFontColor(true)}} className='bg-red-400 inline-block cursor-pointer hover:bg-red-500 text-white px-5 py-1 rounded-lg'>カラー</div>
        <div onClick={() => {setOpenColorDialog(true); setIsFontColor(false)}} className='bg-red-400 inline-block cursor-pointer hover:bg-red-500 text-white ml-3 px-5 py-1 rounded-lg'>背景</div>
      </div>
      {/* Color Dialog */}
      <Dialog open={openColorDialog} onClose={() => setOpenColorDialog(false)}>
        <DialogTitle>{isFontColor ? 'フォント色を選択' : '背景を選択'}</DialogTitle>
        <DialogContent>
          <ChromePicker color={isFontColor ? fontColor : backgroundColor} onChange={handleColorChange} disableAlpha={true}  />
        </DialogContent>
        <DialogActions>
          {
            !isFontColor && (
              <div className='absolute left-4 bottom-3'>
                <label htmlFor="background-upload">
                  <div className="w-[40px] h-[40px] rounded-full bg-gray-200 overflow-hidden relative cursor-pointer">
                    {backgroundImage ? (
                      <img
                        src={backgroundImage}
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
                  id="background-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {
                  backgroundImage !== "" && (
                    <div className='absolute top-2 -right-6 cursor-pointer' onClick={() => {setBackgroundImage("")}}>
                      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.91498 15.4949L9.03117 11.3182L4.7256 7.07504L7.01035 4.75666L11.3159 8.99978L15.4321 4.823L17.8609 7.21656L13.7447 11.3933L18.0503 15.6365L15.7655 17.9548L11.46 13.7117L7.34376 17.8885L4.91498 15.4949Z" fill="black" fillOpacity="0.3"/>
                      </svg>
                    </div>
                  )
                }
                
              </div>
            )
          }
          <Button onClick={() => setOpenColorDialog(false)}>はい</Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor:backgroundColor, backgroundImage:backgroundImage!=='' ? `url(${backgroundImage})`:"", backgroundSize:"cover" }} className='rounded-md shadow-lg p-4 mb-[30px]'>
        {items.map((item, index) => (
          <DraggableItem onChangeData={handleValueState} key={item.id} id={item.id} content={item.content} index={index} moveItem={moveItem} fontColor={fontColor} />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableList;

