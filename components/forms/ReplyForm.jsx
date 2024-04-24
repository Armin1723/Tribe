"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Input } from '../ui/input'
import Image from 'next/image'
import { postComment } from '@/lib/actions/thread.actions'

const ReplyForm = ({userID , parentID}) => {
    const [thread_content, setThread_content] = useState('')
    const [error, setError ] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const path = usePathname()
    
    const handleThread = async (e) => {
        
        const id = toast.loading('sending reply...',{ theme:'dark' })
        e.preventDefault()
        setDisabled(true)
        if( thread_content.length > 280 ){
            setError('Thread cannot exceed 280 characters')
            return
        } 
        await postComment(thread_content, parentID, userID, path)
        toast.update(id, { render: "Reply sent", type: "success", isLoading: false, theme:'dark' });  
        handleReset()  
    }

    const handleReset = () => {
        setThread_content('')
        setError(null)
        setDisabled(false)
        toast.dismiss()
    }

  return (
    <div className='flex flex-col max-sm:w-[90%] w-[90%] border-blue-700/40 rounded-md'>
        <form onSubmit={handleThread} className='flex flex-col'>
            <div className="flex gap-4 h-8">
                <Input type='text' placeholder='Reply...' name='threadContent' value={thread_content} onChange={(e)=>setThread_content(e.target.value)} className='border-2 custom-scrollbar border-[#1e1748] placeholder:text-xs text-xs bg-transparent m-0 h-8 rounded-lg no-focus text-gray-300'/>
                <Button type='submit' disabled={disabled || thread_content==''} className='bg-gradient-to-br from-blue-800/40 hover:opacity-75 shadow-md p-2 rounded-md h-8'>
                    {!disabled ?
                        <Image src='/assets/share.svg' alt='loading' width={24} height={24}/>
                    :
                        <p>O</p>
                    }
                </Button>
            </div>
            
            {error && 
                <div className='flex items-center gap-2 my-1'>
                    <p className='text-xs max-sm:text-[0.65rem] font-semibold font-inter text-red-700'>{error}</p>
                    <button onClick={handleReset} className='p-1 border-2 rounded-md text-[0.6rem] border-purple-900/60 hover:bg-purple-950/80'>Reset</button>
                </div>
            }
        </form>
    </div>
  )
}

export default ReplyForm