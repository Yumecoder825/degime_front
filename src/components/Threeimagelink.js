import React, {useState} from 'react'
import Imagelinkitem from './Imagelinkitem'

export default function Threeimagelink({FileUpload, isClear, onChangeData}) {
  const [childDataArray, setChildDataArray] = useState([]);

  const handleChildData = (childData) => {
    console.log(childData.id);
    childData = {...childData};
    setChildDataArray((prevChildDataArray) => {
      const updatedChildDataArray = [...prevChildDataArray];
      const index = updatedChildDataArray.findIndex((data) => data.id === childData.id);
      if (index !== -1) {
        updatedChildDataArray[index] = childData;
      } else {
        updatedChildDataArray.push(childData);
      }
      onChangeData({data:updatedChildDataArray, type:"threeImage"});
      return updatedChildDataArray;
    });
    console.log(childDataArray);
    
  };
  return (
    <div className="flex gap-2 justify-between">
      <div><Imagelinkitem FileUpload={FileUpload} isClear={isClear} id = {0} onChangeState={handleChildData} /></div>
      <div><Imagelinkitem FileUpload={FileUpload} isClear={isClear} id = {1} onChangeState={handleChildData} /></div>
      <div><Imagelinkitem FileUpload={FileUpload} isClear={isClear} id = {2} onChangeState={handleChildData} /></div>
    </div>
  )
}
