import React from 'react'
import Imagelinkitem from './Imagelinkitem'

export default function Oneimagelink({FileUpload, isClear, onChangeData}) {
 
  const handleState = (newState) =>{
    onChangeData({data:newState, type:"oneImage"});
  }
  
  return (
      <Imagelinkitem FileUpload={FileUpload} isClear={isClear} onChangeState={handleState}/>
  )
}
