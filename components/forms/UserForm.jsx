"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/lib/validations/formValidation"
import Image from "next/image"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { checkAlias, updateUser } from "@/lib/actions/user.actions"
import { firstNames, lastNames } from '@/constants'

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

const UserForm = ({user, purpose}) => {

    const [profilePhoto, setProfilePhoto] = useState([])
    const { startUpload } = useUploadThing('media')
    const router = useRouter()
    const pathname = usePathname()

    //Form Validation
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        profile_photo: user?.image || user.image || "",
        username: user?.username || "",
        name: user?.name || (user?.firstName + ' ' + user?.lastName) || "",
        bio: user?.bio || "",
        alias: user?.alias || ""
        }
    })

    //To update the profile photo in form.
    const handleImage = (e, fieldChange) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            setProfilePhoto(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };
            fileReader.readAsDataURL(file);
        }
    }

    //Genearting Alias
    const getAlias = async (e, fieldChange) => {
        e.preventDefault();
        const alias = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
        const userExists = await checkAlias(alias)
        if(userExists) await getAlias(e, fieldChange)
        else{
            fieldChange(alias)
            return alias
    }   
    }

    //To handle the form submission.
    const handleOnboarding = async (values) => {
        const blob = values.profile_photo

        const hasImageUpdated = isBase64Image(blob)
        if(hasImageUpdated){
            const imgRes = await startUpload(profilePhoto)
            if( imgRes && imgRes[0].fileUrl ){
                values.profile_photo = imgRes[0].fileUrl
            }
        }

        //Create User
        await updateUser({
            name: values.name,
            path: pathname,
            username: values.username,
            userId: user.id,
            bio: values.bio,
            alias: values.alias,
            image: values.profile_photo,
          })

        if (pathname === "/users/username/edit") {
            router.back();
          } else {
            router.push("/");
          }
    }

    return(
        <div className="md:w-[80%] bg-[#1b1b1b] font-[#1b1b1b] md:p-4 p-2 rounded-md flex justify-center md:ml-12 custom-scrollbar overflow-auto my-4 max-sm:border-2 border-slate-600 max-sm:shadow-lg shadow-slate-700">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnboarding)} className="space-y-4 md:w-[90%] p-2">
                
                <FormField 
                    control={form.control} 
                    name='profile_photo'
                    render={({ field }) => (
                    <FormItem className='flex items-center justify-around gap-6'>
                        <FormLabel className='flex h-16 w-auto md:w-20 items-center justify-center bg-[#000] rounded-full overflow-hidden shadow-md shadow-slate-300 mx-2 !important'>
                            {field.value ? (
                            <Image
                                src={field.value}
                                alt='profile_icon'
                                width={96}
                                height={96}
                                priority
                                className='rounded-full object-contain '
                            />
                            ) : (
                            <Image
                                src='/assets/profile.svg'
                                alt='profile_icon'
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
                            placeholder='Add profile photo'
                            className='cursor-pointer text-white bg-transparent outline-none file:text-blue-400/70 !important'
                            onChange={(e) => handleImage(e, field.onChange)}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                    
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl className='flex text-semibold text-gray-800 capitalize'>
                        <Input placeholder="Choose a username." title="Username can not be changed" readOnly className="border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl className='flex text-base-semibold text-gray-800 capitalize'>
                        <Input placeholder="Enter full name" className="border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="alias"
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormLabel className=" text-sm font-semibold bg-gradient-to-br from-blue-800/40 hover:bg-gradient-to-r p-2 my-4 cursor-pointer rounded-md" onClick={async(e)=>await getAlias(e, field.onChange)} >
                                Generate Random Alias
                            </FormLabel>
                            <FormControl className="my-1">
                                {field.value && <input type='text' name="alias" readOnly value={field.value} className="border-4 border-[#1b1b1b] bg-[#121212] no-focus w-full p-[6px] pl-4 capitalize text-sm focus-visible:ring-0 focus-visible:ring-transparent text-gray-300"/>}
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                    <FormItem className='flex w-full flex-col gap-3'>
                        <FormLabel className='text-base-semibold text-light-2'>Bio</FormLabel>
                        <FormControl>
                        <Textarea rows={6} className="border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300" {...field}/>
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

export default UserForm