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
import { getAlias } from "@/lib/actions/user.action"

const UserForm = ({user, purpose}) => {

    const [alias, setAlias] = useState(null)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        profile_photo: user?.imageUrl || user.imageUrl || "",
        username: user?.username || "",
        name: (user?.firstName + ' ' + user?.lastName) || "",
        bio: user?.bio || "",
        alias: user?.alias || ""
        }
    })

    const handleOnboarding = (values) => {
        console.log(values)
    }

    return(
        <div className="md:w-[80%] bg-[#1b1b1b] font-[#1b1b1b] md:p-4 p-2 rounded-md flex justify-center md:ml-8 custom-scrollbar overflow-auto mt-4 mb-2 h-fit">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnboarding)} className="space-y-2 md:w-[90%] md:px-10 p-2">
                
                <FormField 
                    control={form.control} 
                    name='profile_photo'
                    render={({ field }) => (
                    <FormItem className='flex items-center gap-4'>
                        <FormLabel className='account-form_image-label'>
                            {field.value ? (
                            <Image
                                src={field.value}
                                alt='profile_icon'
                                width={96}
                                height={96}
                                priority
                                className='rounded-full object-contain border-4 border-blue-800/40'
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
                        <Input placeholder="Choose a username." className="border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300" {...field} />
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

                <div className="my-1">
                    <p className="text-sm font-semibold bg-gradient-to-br from-blue-800/40 hover:bg-gradient-to-r p-2 my-4 cursor-pointer rounded-md" onClick={()=>{setAlias(getAlias)}}>Generate Random Alias</p>
                    {alias && <div name="alias" className="border-4 border-[#1b1b1b] bg-[#121212] no-focus w-full p-[6px] pl-4 capitalize text-sm focus-visible:ring-0 focus-visible:ring-transparent text-gray-300" >{alias}</div>}
                </div>

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