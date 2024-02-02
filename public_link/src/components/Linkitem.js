import React, {useState, useEffect} from 'react'
import InputLinkItem from './Inputlinkitem'

export default function Linkitem({FileUpload, isClear, onChangeData}) {
  const [urlLink, setUrlLink] = useState("");
  const [state, setState] = useState({
    urlLink: '',
    title: '',
    text: '',
    iconLink: '',
    id:0,
  });

  useEffect(()=>{
    if(isClear){
      setState({
        urlLink: '',
        title: '',
        text: '',
        iconLink: '',
        id:0,
      });
      setUrlLink("");
    }
  }, [isClear]);

  const onChange = (newData) => {
    onChangeData({data:{...state, urlLink:newData.urlLink, title: newData.title, iconLink: newData.iconLink}, type:"link"})
    setState((pre) => ({...pre, urlLink:newData.urlLink, title: newData.title, iconLink: newData.iconLink}));
    setUrlLink(newData.urlLink);
    // console.log("Yes");
  }
  const handleText = (e) =>{
    onChangeData({data:{...state, text:e.target.value}, type:"link"});
    setState((pre) => ({...pre, text:e.target.value}));

  }

  return (
    <div className='flex px-[20px] p-3 justify-between items-center'>
      <div className='p-3'>
        <InputLinkItem FileUpload={FileUpload} isClear={isClear} onChangeData={onChange} />
        <input className='w-full border text-sm border-black rounded-md p-2 px-3 my-1 mb-2 cursor-not-allowed' value={urlLink} disabled name="link-3" placeholder='URL' />
      </div>
      <div>
        <div className='w-full h-10 border text-sm border-black rounded-md p-2 px-3 my-1 mt-2' >{state.title || 'タイトル'}</div>
        <input className='w-full border text-sm border-black rounded-md p-2 px-3 my-1' name="link-2" placeholder='テキスト' value={state.text} onChange={handleText} />
      </div>
    </div>
  )
}
