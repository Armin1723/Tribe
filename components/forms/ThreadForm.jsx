"use client"
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { publishThread } from '@/lib/actions/thread.actions'
import Image from 'next/image'

const ThreadForm = ({userID , parentID, spacename}) => {
    const [thread_content, setThread_content] = useState('')
    const [error, setError ] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const router = useRouter()
    
    const handleThread = async (e) => {
        e.preventDefault()
        setDisabled(true)
        if( thread_content.length > 280 ){
            setError('Thread cannot exceed 280 characters')
            return
        } 
            
        await publishThread({
            thread_content : thread_content,
            thread_author : userID,
            parentId : parentID
        }, spacename)
        router.back()
    }

    const handleReset = () => {
        setThread_content('')
        setError(null)
        setDisabled(false)
    }
  return (
    <div className='flex flex-col max-sm:w-[100vw] px-4 w-[50vw] border-blue-700/40 rounded-md'>
        <form onSubmit={handleThread} className='flex flex-col gap-4 my-4'>
            <Textarea placeholder='Thread details...' name='threadContent' value={thread_content} onChange={(e)=>setThread_content(e.target.value)} rows={9} className='border-4 custom-scrollbar border-[#1b1b1b] bg-[#121212] no-focus text-gray-300'/>
            {error && 
                <div className='flex items-center gap-2'>
                    <p className='text-xs font-semibold font-inter text-red-700 -py-2'>{error}</p>
                    <button onClick={handleReset} className='p-1 border-2 rounded-md text-[0.6rem] border-purple-900/60 hover:bg-purple-950/80'>Reset</button>
                </div>
            }
            <Button type='submit' disabled={disabled} className='w-full mt-2'>
                {disabled ? <Image src='/assets/spinner.svg' alt='loading' width={24} height={24} className='w-full mx-auto'/> :  'Publish Thread'}
            </Button>
        </form>
    </div>
  )
}

export default ThreadForm
