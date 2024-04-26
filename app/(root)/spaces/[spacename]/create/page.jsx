import ThreadForm from '@/components/forms/ThreadForm'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({params}) => {
  const user = await currentUser()
  if(!user) return null
  const userData = await fetchUser(user.id)

  return (
    <div className='flex flex-col items-center'>
      <div className='font-bold text-xl'>Create Thread</div>
      <ThreadForm parentID={null} userID={userData._id} spacename={params.spacename.split('-').join(' ')}/>
    </div>
  )
}

export default page
