import React, {useState, useEffect} from 'react'

export default function Spaceitem({isClear, onChangeData}) {
  const [value, setValue] = useState(0);

  const handleInput = (e) => {
    e.preventDefault();
    (e.target.value <= 20 && e.target.value >= 5) && setValue(e.target.value);
    (e.target.value <= 20 && e.target.value >= 5) && onChangeData({data:e.target.value, type:"space"});
    (e.target.value < 5) && setValue(5);
    (e.target.value < 5) && onChangeData({data:5, type:"space"});
  }
  useEffect(()=>{
    isClear && setValue(0);
  }, [isClear])
  return (
    <div className='relative'>
      <h2>余白サイズを指定してください</h2>
      <input className='p-3 my-2 w-full border' value={value} onChange={handleInput}/>
      <label className='absolute top-1/2 left-10'>mm幅</label>
      <div className='absolute cursor-pointer right-3 top-1/2'>
        <div onClick={() =>{onChangeData({data:value < 5 ? 5 : value < 20 ? parseInt(value)+1 : value, type:"space"}); setValue(pre=>( pre < 5 ? 5 : pre < 20 ? parseInt(pre)+1 :pre)); }}><img className='w-[15px] h-[15px]' alt="up" src="/image/up-arrow.png"/></div>
        <div onClick={() =>{onChangeData({data:value>5 ? value-1 : value, type:"space"}); setValue(pre=>(pre>5 ? pre-1 : pre)); }}><img className='w-[15px] h-[15px]' alt="down" src="/image/down-arrow.png"/></div>
      </div>
    </div>
  )
}
