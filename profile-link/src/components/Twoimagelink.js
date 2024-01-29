import React, {useState} from 'react'
import Imagelinkitem from './Imagelinkitem'

export default function Twoimagelink({FileUpload, isClear, onChangeData}) {
  const [childDataArray, setChildDataArray] = useState([]);

  const handleChildData = (childData) => {
    childData = {...childData};
    const updatedChildDataArray = [...childDataArray];
    const index = updatedChildDataArray.findIndex((data) => data.id === childData.id);
    if (index !== -1) {
      updatedChildDataArray[index] = childData;
    } else {
      updatedChildDataArray.push(childData);
    }
    onChangeData({data:updatedChildDataArray, type:"twoImage"});
    setChildDataArray(updatedChildDataArray);
    
  };
  return (
    <div className="flex gap-2 justify-between">
      <div><Imagelinkitem FileUpload={FileUpload} isClear={isClear} id = {0} onChangeState={handleChildData} /></div>
      <div><Imagelinkitem FileUpload={FileUpload} isClear={isClear} id = {1} onChangeState={handleChildData} /></div>
    </div>
  )
}
