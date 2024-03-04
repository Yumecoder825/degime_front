import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({isClear, onChangeData}) {
  const [editorContent, setEditorContent] = useState('');
  const quillRef = useRef(null);

  useEffect(()=>{
    isClear && setEditorContent('');
  }, [isClear]);

  const handleEditorChange = (content) => {
    setEditorContent(content);

    onChangeData({data:content, type:"text"})
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  return (
    <div>
      <ReactQuill value={editorContent} onChange={(e)=>{handleEditorChange(e)}} modules={modules} ref={quillRef} />
      {console.log("Editor: ", editorContent)}
      <DisplayComponent editedData={editorContent} />
    </div>
  );
}

function DisplayComponent({ editedData }) {
  return (
    <div>

    </div>
  );
}

export default TextEditor;