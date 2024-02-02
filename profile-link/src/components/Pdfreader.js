import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


const PdfReader = ({FileUpload, isClear, onChangeData}) => {
  // Set the workerSrc path
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(()=>{
    if(isClear) {
      setFile(null);
      setNumPages(null);
    }
  }, [isClear]);
  const onFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const uploaded_url = await FileUpload(selectedFile);
        onChangeData({data:{file:uploaded_url, title:title, text:text}, type:"slideImage"})
        setFile(uploaded_url);
        e.target.value = null;
      } catch (error) {
        console.error('Error creating object URL:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <div>
      <label htmlFor='pdfUpload' className='py-1 px-3 inline-block opacity-80 mb-1 text-white cursor-pointer hover:opacity-100 active:opacity-40 rounded-full bg-orange-400' >アップロード <input type="file" id="pdfUpload" className='hidden' onChange={onFileChange} /></label>
      <div className='overflow-y-auto w-full aspect-[4/3] bg-slate-300'>
        {file && (
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={.8} />
            ))}
          </Document>
        )}
      </div>
      <input className='w-full text-sm border border-black rounded-md p-2 px-3 my-1 mt-2' name="link-1" placeholder='タイトル' value={title} onChange={(e) =>{setTitle(e.target.value); onChangeData({data:{file:file, title:e.target.value, text:text}, type:"slideImage"}) }} />
      <input className='w-full text-sm border border-black rounded-md p-2 px-3 my-1' name="link-2" placeholder='テキスト' value={text} onChange={(e) =>{setText(e.target.value); onChangeData({data:{file:file, title:title, text:e.target.value}, type:"slideImage"}) }} />
    </div>
  );
};

export default PdfReader;