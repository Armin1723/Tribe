// "use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useUploadThing } from "@/lib/uploadthing";
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css'
import { formSchema } from "@/lib/validations/blogValidation";
import Image from "next/image";
import { isBase64Image } from "@/lib/utils";
import { createBlog } from "@/lib/actions/blog.actions"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

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

const BlogForm =() => {
    
    const [value, setValue] = useState("");
    const [blogImage, setBlogImage] = useState([]);
    const { startUpload } = useUploadThing('media')
    const router = useRouter()
    const QuillNoSSRWrapper = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

    //Form Validation
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blog_image: "",
            title: "",
            description: "",
            content: ""
        }
    })

     //To update the blog image in form.
     const handleImage = (e, fieldChange) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            setBlogImage(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };
            fileReader.readAsDataURL(file);
        }
    }

    //Handle Create Blog
    const publishBlog = async (values) => {
        const blob = values.blog_image
        const id = toast.loading("Publishing...",{theme:'dark'})

        const hasImageUpdated = isBase64Image(blob)
        if(hasImageUpdated){
            const imgRes = await startUpload(blogImage)
            if( imgRes && imgRes[0].fileUrl ){
                values.blog_image = imgRes[0].fileUrl
            }
        }

        await createBlog(values)
        toast.update(id, { render: "Blog Published", type: "success", isLoading: false, theme:'dark' });
        router.push("/")
    }

    return(
        <div className="content-container border-2 rounded-md p-2 mb-[10vh] mr-2 min-w-[65vw]">
            <ToastContainer/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(publishBlog)} className="space-y-4 p-2">
                
                <FormField 
                    control={form.control} 
                    name='blog_image'
                    render={({ field }) => (
                    <FormItem className='flex flex-col items-center justify-around gap-2'>
                        <FormLabel className='flex items-center justify-center bg-[#000]'>
                            {field.value ? (
                            <Image
                                src={field.value}
                                alt='blog_image'
                                width={400}
                                height={200}
                                priority
                                className='object-contain border-[1px] rounded-md border-[#1b1b1b] w-full aspect-video overflow-hidden '
                            />
                            ) : (
                            <Image
                                src='/assets/profile.svg'
                                alt='blog_image'
                                width={48}
                                height={48}
                                className='object-contain mt-2'
                            />
                         )}
                        </FormLabel>
                        <FormControl className='flex text-semibold text-gray-800'>
                            <Input
                            type='file'
                            accept='image/*'
                            placeholder='Add Blog Image'
                            className='cursor-pointer text-white bg-transparent outline-none file:text-blue-400/70 !important'
                            onChange={(e) => handleImage(e, field.onChange)}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                    
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title of the blog</FormLabel>
                        <FormControl className='flex text-semibold text-gray-800 capitalize'>
                        <Input placeholder="Choose a title." className="border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                    <FormItem className='flex w-full flex-col gap-3'>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                        <Textarea rows={3} placeholder="Give a short description." className="border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                    <FormItem className='flex w-full flex-col gap-3'>
                        <FormLabel>Enter Blog Content</FormLabel>
                        <FormControl>
                            <QuillNoSSRWrapper 
                                className='bg-[#0c0c0c] min-h-content rounded-md max-w-full' 
                                value={value} 
                                onChange={(e)=>setValue(e)}
                                modules={modules}
                                formats={formats} 
                                theme="snow"
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                    <Button type="submit" className='w-full hover:bg-gradient-to-br from-blue-800/40 active:border-2 border-blue-600'>Publish</Button>
                </form>
            </Form>
        </div>
    )
}

export default BlogForm;