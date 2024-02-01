import React, {useState} from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar';


export default function Adminlayout() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const tabList = ["ユーザーリスト", "系譜一覧", "１次代理店", "２次代理店"];

  const handleNavigate = (index) =>{
    navigate(tabList[index]);
    setTab(index);
  }
  return (
    <div className='absolute left-0 w-full min-h-[100vh] bg-gray-100'>
      <div className="sidebar fixed flex flex-col top-0 left-0 max-md:w-14 max-md:text-xs hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow" style={{backgroundImage:"linear-gradient(#ECBA6D, #CF7E8C, #B67995)"}}>
          <Link to="/dashboard"><img alt="logo" src="/image/logo1.png"  /></Link>
          <ul className='text-white text-center h-full max-md:mt-24'>
            {
              tabList.map((item, index)=>(
                <li key={index} className={`px-2 mt-5 justify-center flex cursor-pointer hover:underline py-2 ${tab === index && 'bg-gray-100 text-neutral-500 border-l-8 border-l-orange-600'}`} onClick={()=>handleNavigate(index)}><span className=''>{item}</span></li>
              ))
            }
          </ul>
          <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2024</p>
        </div>
      </div>
      <div className='max-md:ml-8 md:ml-64 overflow-auto'>
        <div className='h-[80px] w-full max-md:mb-16 flex justify-center items-center' style={{backgroundImage:"linear-gradient(to right, #ECBA6D, #CF7E8C, #B67995)"}}>
          <SearchBar />
        </div>
        <div className='px-10 py-5 hidden md:flex'>トップ画面 ＞<div onClick={()=>handleNavigate(tab)} className="cursor-pointer hover:opacity-70 hover:underline text-blue-600">{tabList[tab]}</div></div>
        <Outlet />
      </div>
    </div>
  )
}
