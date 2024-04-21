import SpaceForm from '@/components/forms/SpaceForm'
import React from 'react'

const page = async () => {
  return (
    <div className='flex flex-col px-2 md:w-[65vw] max-sm:w-full max-lg:min-w-[88vw] text-sm'>
        <h1 className='md:text-3xl text-2xl font-bold my-2' >Create Your Own Space</h1>
        <p className='max-sm:text-xs'>You are one step away from creating your pseudonymous private space to speak your mind.</p>
        <SpaceForm purpose="Create Space"/>
    </div>
  )
}

export default page
