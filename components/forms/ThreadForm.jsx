"use client"
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { publishThread } from '@/lib/actions/thread.actions'

const ThreadForm = ({userID , parentID, spacename}) => {
    const [thread_content, setThread_content] = useState('')
    const router = useRouter()
    const handleThread = async (e) => {
        const id = toast.loading('Publishing thread...',{ theme:'dark' })
        e.preventDefault()    
        await publishThread({
            thread_content : thread_content,
            thread_author : userID,
            parentId : parentID
        }, spacename)
        toast.update(id, { render: "Blog Published", type: "success", isLoading: false, theme:'dark' });
        router.back()
    }
  return (
    <div className='flex flex-col max-sm:w-[100vw] px-4 w-[50vw] border-blue-700/40 rounded-md'>
        <form onSubmit={handleThread} className='flex flex-col gap-4 my-4'>
            <Textarea placeholder='Thread details...' name='threadContent' value={thread_content} onChange={(e)=>setThread_content(e.target.value)} row={5} className='border-4 border-[#1b1b1b] bg-[#121212] no-focus text-gray-300'/>
            <Button type='submit' className='w-full mt-2'>Publish Thread</Button>
        </form>
    </div>
  )
}

export default ThreadForm
