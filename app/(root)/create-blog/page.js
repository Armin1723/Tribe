'use client';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote','code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { list: 'check' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ 'script': 'sub'}, { 'script': 'super' }], 
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'script',
    'italic',
    'underline',
    'code-block',
    'strike',
    'color',
    'background',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

const createBlog =() => {
    
    const [value, setValue] = useState("");
    const QuillNoSSRWrapper = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

    return(
        <div className="custom-scrollbar flex flex-col gap-[6vh] justify-center w-full">
            <h1>Create Blog</h1>
            <QuillNoSSRWrapper 
                className='bg-[#0c0c0c] max-sm:w-[80vw] max-sm:mx-4 w-[60vw] min-h-content rounded-md ' 
                value={value} 
                onChange={(e)=>setValue(e)}
                modules={modules}
                formats={formats} 
                theme="snow" 
            />
        </div>
    )
}

export default createBlog;