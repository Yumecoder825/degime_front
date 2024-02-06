import React, {useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';
import 'react-quill/dist/quill.snow.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import axios from 'axios'
import fileDownload from 'js-file-download'

export default function Listcomponent({index, moveItem, profileListData, id, isDelete}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const deleteList = () => {
    isDelete(id);
  }
  const handlePlaying = () => {
    setIsPlaying((pre) => !pre);
  }
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
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

  const handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, `${filename}.pdf`)
    })
  }
  return (
    <div className='py-3 relative'>
      <div className='cursor-grab active:cursor-grabbing absolute left-[50%] transform -translate-x-1/2 z-10' ref={(node) => ref(drop(node))}>
        <svg width="18" height="7" viewBox="0 0 18 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0L17.6603 6.75H0.339746L9 0Z" fill="#A9A9A9"/>
        </svg>
        <svg width="18" height="7" viewBox="0 0 18 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 7L0.339745 0.25L17.6603 0.25L9 7Z" fill="#A9A9A9"/>
        </svg>
      </div>
      <div className='w-[24px] h-[24px] absolute top-3 right-3 z-10 bg-slate-300 p-2 rounded-full bg-no-repeat bg-center hover:bg-slate-400 cursor-pointer' style={{backgroundImage:'url("image/close.svg")'}} onClick={deleteList} ></div>
      {
        profileListData.type==="oneImage" && (
          <div>
            <div className="relative w-full aspect-[16/9] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data.imageLink})`,backgroundSize:"cover"}}></div>
            <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data.title}</div> 
            <div className='w-full text-sm text-center px-3'>{profileListData.data.text}</div> 
          </div>
        )
      }
      {
        profileListData.type==="twoImage" && (
          <div className="flex gap-2 justify-between">
            <div className='w-full'>
              <div className="w-full aspect-[16/9] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[0].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[0].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[0].text}</div> 
            </div>
            <div className='w-full'>
              <div className="w-full aspect-[16/9] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[1].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[1].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[1].text}</div> 
            </div>
          </div>
        )
      }
      {
        profileListData.type==="threeImage" && (
          <div className="flex gap-2 justify-between">
            <div className='w-full'>
              <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[0].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[0].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[0].text}</div> 
            </div>
            <div className='w-full'>
              <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[1].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[1].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[1].text}</div> 
            </div>
            <div className='w-full'>
              <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[2].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[2].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[2].text}</div> 
            </div>
          </div>
        )
      }
      {
        profileListData.type==="fourImage" && (
          <div className="flex gap-2 justify-between">
            <div className='w-full'>
              <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[0].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[0].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[0].text}</div> 
            </div>
            <div className='w-full'>
              <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[1].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[1].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[1].text}</div> 
            </div>
            <div className='w-full'>
              <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[2].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[2].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[2].text}</div> 
            </div>
            <div className='w-full'>
              <div className="w-full aspect-[1/1] rounded-lg border-black border-2 overflow-hidden mx-auto" style={{backgroundImage:`url(${profileListData.data[3].imageLink})`,backgroundSize:"cover"}}></div>
              <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data[3].title}</div> 
              <div className='w-full text-sm text-center px-3'>{profileListData.data[3].text}</div> 
            </div>
          </div>
        )
      }
      {
        profileListData.type==="videoLink" && (
          <div className="relative w-full h-auto rounded-lg border-black border-2 overflow-hidden mx-auto">
            {profileListData.data && <ReactPlayer url={profileListData.data} playing={isPlaying} width="100%" height="auto" onClick={()=>{handlePlaying()}} />}
          </div>
        )
      }
      {
        profileListData.type==="text" && (
          <div className='w-full h-auto text-wrap border rounded-md border-black'>
            <div dangerouslySetInnerHTML={{ __html: profileListData.data }} className='p-4 text-wrap break-words ql-editor' />
          </div>
        )
      }
      {
        profileListData.type==="map" && (
          <div style={{ width: '100%', height: '400px' }}>
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              style={{ border: '0' }}
              src={`${profileListData.data}&output=embed`}
              allowFullScreen
            />
          </div>
        )
      }
      {
        profileListData.type==="link" && (
          <div className='flex px-[20px] p-2 justify-start items-center border rounded-md'>
            <div className='p-2'>
              <img
                className="w-[50px] h-[50px] cursor-pointer max-[800px]:w-[40px] max-[800px]:h-[40px]"
                src={profileListData.data.iconLink}
                alt="edit"
              />
            </div>
            <div>
              <div className='w-full text-lg font-bold rounded-md p-2 px-3 my-1 mt-2'>{profileListData.data.title}</div>
              <div className='w-full text-sm rounded-md p-2 px-3 my-1'>{profileListData.data.text}</div>
            </div>
          </div>
        )
      }
      {
        profileListData.type==="space" && (
          <div className={`w-full p-2 bg-slate-200 rounded-lg`} style={{height:profileListData.data * 5}}></div>
        )
      }
      {
        profileListData.type==="selfProfile" && (
          <div className={`w-full p-2 `} >
            <div className={`py-2 px-4 text-white rounded-lg bg-${profileListData.data.color} cursor-pointer hover:opacity-90 active:opacity-80`}>{profileListData.data.title}</div>
            <div className='w-full text-sm rounded-md p-2 px-3 my-1 text-wrap'>{profileListData.data.text}</div>
          </div>
        )
      }
      {
        profileListData.type==="slideImage" && (
          <div className='flex flex-col items-center'>
            <div className='overflow-y-auto w-full aspect-[4/3] bg-slate-300'>
              <Document file={profileListData.data.file} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={.8} />
                ))}
              </Document>
            </div>
            <div className='w-full text-2xl font-bold text-center px-3 ' >{profileListData.data.title}</div> 
            <div className='w-full text-sm text-center px-3'>{profileListData.data.text}</div> 
            <button className="downloadButton p-3 px-5 mt-3 rounded-full text-white/90 flex drop-shadow-lg font-bold" onClick={()=>handleDownload(profileListData.data.file, profileListData.data.title || "document")}>ダウンロード<img className='shrink-0' alt="download" src="/image/ダウンロード.png" width="25"/></button>
          </div>
        )
      }
    </div>
  )
}
