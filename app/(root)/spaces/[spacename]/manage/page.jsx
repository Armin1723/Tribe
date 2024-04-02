import SpaceActionButton from "@/components/buttons/SpaceActionButton"
import { fetchRequests, fetchSpace } from "@/lib/actions/space.actions"
import { fetchUser, fetchUsernameById } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const page = async({params}) => {
    const results = await fetchSpace(params.spacename.split('-').join(' '))
    const userData = await currentUser()
    const user = await fetchUser(userData.id)
    if(!user) return redirect('/login')
    if(!user.onboarded) return redirect('/onboarding')
    if(!results.isAdmin) return redirect(`/spaces/${params.spacename}`)

    const requests = await fetchRequests(params.spacename.split('-').join(' '))

  return (
    <div className="flex flex-col justify-center font-inter md:w-[65vw] max-lg:min-w-[88vw]">

      <div className="requests flex flex-col gap-2">
        <p className="font-bold text-xl my-2">Requests</p>
        {requests?.length > 0 ?
            requests.map((request)=>{
                return(
                    <div key={request._id} className="flex justify-between p-2 md:gap-2 rounded-md bg-gray-900/50">
                        <Image src={request.image} alt="user_image" width={48} height={48} className='rounded-full w-16 h-16 border-2'/>
                        <div className="flex flex-col justify-center">
                            <p>{request.name}</p>
                            <Link href={`/users/${request.username}`} className="text-blue-700 hover:opacity-75 text-sm">@{request.username}</Link>
                            <p className="text-sm max-sm:text-xs">{request.alias}</p>
                        </div>
                        <SpaceActionButton spacename={results.space.space_name} userId={request._id.toString()}/>
                    </div>
                )
            }):
            <p>No pending requests at the moment.</p>
        }
        <div className="w-full border border-white my-2"></div>
      </div>

      <div className="requests flex flex-col gap-2">
            <p className="font-bold text-xl my-2">Members.</p>
            {results.space.space_members?.length > 1 ?
                results.space.space_members.map(async(member)=>{
                    const username = await fetchUsernameById(member._id)
                    return(
                        <div className={`${results.space.space_admin._id.toString() === member._id.toString() ? 'hidden' : ''} flex justify-between w-full rounded-md bg-gray-900/50 gap-2 p-2`} key={member._id}>
                            <div className="flex flex-col">
                                <p className="">{member.alias}</p>
                                <p className='text-xs'>Member ID: {member._id}</p>
                            </div>
                            <Link href={`/users/${username}`} className="text-blue-700 hover:opacity-75 text-sm items-center flex">@{username}</Link>
                        </div>
                    )
                }):
                <p>No members other than the admin.</p>
            }
            <div className="w-full border border-white my-2"></div>
        </div>

    </div>
  )
}

export default page
