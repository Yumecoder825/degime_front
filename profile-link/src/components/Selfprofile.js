import React, {useState, useEffect} from 'react'

export default function Selfprofile({isClear, onChangeData}) {
  const [state, setState] = useState({
    title:'',
    color:'',
    text:'',
  });
  const [titleType, setTytleType] = useState("");
  const [text, setText] = useState("");
  const selfProfile=[{"type":"資格", "color":"red-400"},
                      {"type":"特技", "color":"red-400"},
                      {"type":"経歴", "color":"red-400"},
                      {"type":"事業の強み", "color":"red-400"},
                      {"type":"提供できるリソース", "color":"red-400"},
                      {"type":"イノベーション実績", "color":"red-400"},
                      {"type":"お知らせ", "color":"orange-400"},
                      {"type":"メッセージ", "color":"orange-400"},
                      {"type":"アイデア募集中", "color":"purple-500"},
                      {"type":"こんな企業と出会いたい", "color":"purple-500"},
                      {"type":"抱えている問題", "color":"neutral-600"},
                      {"type":"実現したいことや目標", "color":"purple-500"},
                      {"type":"苦手なこと", "color":"neutral-600"},
                    ]
  const handleTitleType = (e) => {
    e.preventDefault();
    setTytleType(e.target.innerHTML);
    const color = selfProfile.find(item => item.type === e.target.innerHTML)?.color;
    onChangeData({data:{...state, title:e.target.innerHTML, color:color}, type:"selfProfile"})
    setState({...state, title:e.target.innerHTML, color:color});
  }

  useEffect(()=>{
    if(isClear){
      setTytleType("タイトル選択");
      setText("");
    }
  },[isClear])
  return (
    <div>
      <div className='flex flex-wrap gap-3 mb-5'>
        {selfProfile.map((item, index) =>(
          <div key={index} className={`py-2 px-4 text-white rounded-lg bg-${item.color} cursor-pointer hover:opacity-90 active:opacity-80`} onClick={handleTitleType}>{item.type}</div>
        ))}
      </div>
      <div className='p-3 w-full border mb-3 rounded-md text-black/50'>{titleType}</div> 
      <input className='p-3 w-full border mb-3 rounded-md' value = {text} onChange = {(e)=>{setText(e.target.value); onChangeData({data:{...state, text:e.target.value}, type:"selfProfile"})}} placeholder='テキスト入力' />
    </div>
  )
}
