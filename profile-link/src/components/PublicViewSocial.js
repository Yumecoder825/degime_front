import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';

import axios from 'axios'
import fileDownload from 'js-file-download'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function PublicViewSocial({publishData}) {
  const images = publishData.idCard && publishData.idCard.idCard;
  const [lastImage, setLastImages] = useState(publishData.idCard && publishData.idCard.idCard[0]);
  const [newProfileData, setNewProfileData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const handlePlaying = () => {
    setIsPlaying((pre) => !pre);
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, `${filename}.pdf`)
    })
  }

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

  useEffect(()=>{
    // Assuming 'data' contains the given array
    const newData = {};
    if (publishData.snsTree_Data)
    Object.keys(publishData.snsTree_Data).forEach(key => {
      newData[key] = publishData.snsTree_Data[key].map(obj => ({ ...obj, type: key }));
    });
    const combinedArray = Object.values(newData)
    .flat()
    .sort((a, b) => a.order - b.order);
    // console.log("Combined: ",combinedArray)
    setNewProfileData(combinedArray);
  }, [publishData.snsTree_Data]);
  return (
    <div className=''>
      <Link to="/dashboard"><img alt="logo" src="/image/logo.png" width="150" className='pt-3 pl-5 mb-5' /></Link>
      <div className="min-w-[320px] w-[50%] mx-auto pt-1">
        <div
          className="relative min-w-[335px] w-full aspect-[4/3] rounded-lg border-indigo-700 border-2 overflow-hidden mx-auto"
          style={{
              backgroundImage: `url(${lastImage || publishData.idCard.idCard[0]})`,
              backgroundSize: "cover",
            }}
          >
          {images && (
            <div className="flex items-center justify-between absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`carousel-${index}`}
                  className="w-12 h-12 object-cover rounded-full cursor-pointer"
                  onClick={() => {
                    setLastImages(image);
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center -mt-[85px] mb-[40px] items-center">
        <div className="min-[800px]:w-[150px] h-[150px] max-[800px]:w-[110px] max-[800px]:h-[110px] rounded-full bg-gray-200 overflow-hidden relative cursor-pointer">
            {publishData.faceImg ? (
              <img
                src={publishData.faceImg}
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
          <div className='border rounded-lg p-3 my-4 text-lg w-[70%]'>{publishData.accountName}</div> 
          <div className='border rounded-lg p-3 text-lg w-[70%]'>{publishData.profile}</div>
				</div>

        {
          newProfileData.map((item, index)=>(
            <div key={index} className='py-3'>
              {
                item.type==="imgLink1" && (
                  <div>
                    <div className="relative w-full aspect-[16/9] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url})`,backgroundSize:"cover"}}></div>
                    <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title}</div> 
                    <div className='w-full text-sm text-center px-3'>{item.text}</div> 
                  </div>
                )
              }
              {
                item.type==="imgLink2" && (
                  <div className="flex gap-2 justify-between">
                    <div className='w-full'>
                      <div className="w-full aspect-[16/9] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url1})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title1}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text1}</div> 
                    </div>
                    <div className='w-full'>
                      <div className="w-full aspect-[16/9] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url2})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title2}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text2}</div> 
                    </div>
                  </div>
                )
              }
              {
                item.type==="imgLink3" && (
                  <div className="flex gap-2 justify-between">
                    <div className='w-full'>
                      <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url1})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title1}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text1}</div> 
                    </div>
                    <div className='w-full'>
                      <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url2})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title2}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text2}</div> 
                    </div>
                    <div className='w-full'>
                      <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url3})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title3}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text3}</div> 
                    </div>
                  </div>
                )
              }
              {
                item.type==="imgLink4" && (
                  <div className="flex gap-2 justify-between">
                    <div className='w-full'>
                      <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url1})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title1}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text1}</div> 
                    </div>
                    <div className='w-full'>
                      <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url2})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title2}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text2}</div> 
                    </div>
                    <div className='w-full'>
                      <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url3})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title3}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text3}</div> 
                    </div>
                    <div className='w-full'>
                      <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${item.url4})`,backgroundSize:"cover"}}></div>
                      <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title4}</div> 
                      <div className='w-full text-sm text-center px-3'>{item.text4}</div> 
                    </div>
                  </div>
                )
              }
              {
                item.type==="videoLink" && (
                  <div className="relative w-full h-auto rounded-lg border-black border-2 overflow-hidden mx-auto">
                    {item.data && <ReactPlayer url={item.url} playing={isPlaying} width="100%" height="auto" onClick={()=>{handlePlaying()}} />}
                  </div>
                )
              }
              {
                item.type==="textLink" && (
                  <div className='w-full h-auto text-wrap border rounded-md border-black'>
                    <div dangerouslySetInnerHTML={{ __html: item.text }} className='p-4 text-wrap break-words ql-editor' />
                  </div>
                )
              }
              {
                item.type==="mapLink" && (
                  <div style={{ width: '100%', height: '400px' }}>
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="100%"
                      style={{ border: '0' }}
                      src={`${item.mapLink}&output=embed`}
                      allowFullScreen
                    />
                  </div>
                )
              }
              {
                item.type==="spaceAdd" && (
                  <div className={`w-full p-2 bg-slate-200 opacity-50 rounded-lg`} style={{height:item.space*5}}></div>
                )
              }
              {
                item.type==="selfProfile" && (
                  <div className={`w-full p-2 `} >
                    <div className={`py-2 px-4 text-white rounded-lg bg-${item.title ? selfProfile.find(element => element.type === item.title).color : 'white'} cursor-pointer hover:opacity-90 active:opacity-80`}>{item.title}</div>
                    <div className='w-full text-sm rounded-md p-2 px-3 my-1 text-wrap'>{item.content}</div>
                  </div>
                )
              }
              {
                item.type==="slideLink" && (
                  <div className='flex flex-col items-center'>
                    <div className='overflow-y-auto w-full aspect-[4/3] bg-slate-300'>
                      <Document file={item.url} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                          <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={.8} />
                        ))}
                      </Document>
                    </div>
                    <div className='w-full text-2xl font-bold text-center px-3 ' >{item.title}</div> 
                    <div className='w-full text-sm text-center px-3'>{item.text}</div> 
                    <button className="downloadButton p-3 px-5 mt-3 rounded-full text-white/90 flex drop-shadow-lg font-bold" onClick={()=>handleDownload(item.url, item.title || "document")}>ダウンロード<img className='shrink-0' alt="download" src="/image/ダウンロード.png" width="25"/></button>
                  </div>
                )
              }
              {
                item.type==="dataLink" && (
                  <div className='flex px-[20px] p-2 justify-start items-center border rounded-md'>
                    <div className='p-2'>
                      <img
                        className="w-[50px] h-[50px] cursor-pointer max-[800px]:w-[40px] max-[800px]:h-[40px]"
                        src={item.imgLink}
                        alt="edit"
                      />
                    </div>
                    <div>
                      <div className='w-full text-lg font-bold rounded-md p-2 px-3 my-1 mt-2'>{item.title}</div>
                      <div className='w-full text-sm rounded-md p-2 px-3 my-1'>{item.content}</div>
                    </div>
                  </div>
                )
              }
            </div>
          ))
        }
        {/* <DraggableList onChangeData={handleDraggableList} />

        <DndProvider backend={HTML5Backend}>
          { 
            profileData && profileData.map((item, index) =>(
              <Listcomponent key = {index} id = {index} index={index} item={item} moveItem={moveItem} isDelete = {deleteProfileData} />
            ))
          }
        </DndProvider>
        <div className="mt-[40px]">
          {
            profileButton.map((item, key)=>(
              item.type!=="link" && <div key={key} type={item.type} className="p-3 px-5 border rounded-md my-3 cursor-pointer border-black text-black/30 hover:text-black" onClick={handleModal} >{item.placeholder}</div>
            ))
          }
        </div> */}
      </div>
    </div>
  )
}
