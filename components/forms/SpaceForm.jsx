"use client"

import { createSpace } from "@/lib/actions/space.actions"
import { useUploadThing } from "@/lib/uploadthing"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import Image from "next/image"
import { Button } from "../ui/button"
import { formSchema } from "@/lib/validations/spaceValidation"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { isBase64Image } from "@/lib/utils"


const SpaceForm = ({user, purpose}) => {

    const [image, setImage] = useState([])
    const [value, setValue] = useState("");
    const { startUpload } = useUploadThing('media')
    const router = useRouter()
    const pathname = usePathname()

    //Form Validation
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        space_name: "",
        space_image : "",
        space_description : "",
        }
    })

    //To update the image in form.
    const handleImage = (e, fieldChange) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            setImage(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };
            fileReader.readAsDataURL(file);
        }
    }


    //To handle the form submission.
    const handleSpaceCreation = async (values) => {
        const id = toast.loading("Creating Space...",{theme:'dark'});
        const blob = values.space_image

        const hasImageUpdated = isBase64Image(blob)
        if(hasImageUpdated){
            const imgRes = await startUpload(image)
            if( imgRes && imgRes[0].fileUrl ){
                values.space_image = imgRes[0].fileUrl
            }
        }


        //Create Space
        await createSpace(values)
        toast.update(id, { render: "Space Created.", type: "success", isLoading: false, theme:'dark', autoClose: 2000 , closeOnClick: true});
        router.push(pathname);
    }

    return(
        <div className="md:w-[80%] bg-[#1b1b1b] font-[#1b1b1b] md:p-4 p-2 rounded-md flex justify-center md:ml-12 custom-scrollbar overflow-auto my-4 max-sm:border-2 border-slate-600 max-sm:shadow-lg shadow-slate-700">
            <ToastContainer/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSpaceCreation)} className="space-y-4 md:w-[90%] p-2">
                
                <FormField 
                    control={form.control} 
                    name='space_image'
                    render={({ field }) => (
                    <FormItem className='flex items-center justify-around gap-6'>
                        <FormLabel className='flex h-16 w-auto md:w-20 items-center justify-center bg-[#000] rounded-full overflow-hidden shadow-md shadow-slate-300 mx-2 !important'>
                            {field.value ? (
                            <Image
                                src={field.value}
                                alt='space_image'
                                width={96}
                                height={96}
                                priority
                                className='rounded-full object-contain '
                            />
                            ) : (
                            <Image
                                src='/assets/profile.svg'
                                alt='space_image'
                                width={24}
                                height={24}
                                className='object-contain'
                            />
                         )}
                        </FormLabel>
                        <FormControl className='flex text-semibold text-gray-800'>
                            <Input
                            type='file'
                            accept='image/*'
                            placeholder='Add Image'
                            className='cursor-pointer text-white bg-transparent outline-none file:text-blue-400/70 !important'
                            onChange={(e) => handleImage(e, field.onChange)}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                    
                <FormField
                    control={form.control}
                    name="space_name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Space Name</FormLabel>
                        <FormControl className='flex text-semibold text-gray-800 capitalize'>
                            <Input placeholder="Choose a Space Name." className="border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='space_description'
                    render={({ field }) => (
                    <FormItem className='flex w-full flex-col gap-3'>
                        <FormLabel className='text-base-semibold text-light-2'>Space Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder='Choose what defines your space.' rows={6} className="border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className='w-full hover:bg-gradient-to-br from-blue-800/40 active:border-2 border-blue-600'>{purpose}</Button>
                </form>
            </Form>
        </div>
    )
}

export default SpaceForm