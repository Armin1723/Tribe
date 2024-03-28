import UserForm from "@/components/forms/UserForm"
import { fetchUserByUsername } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"

const page = async ({params}) => {
    const userInfo = await currentUser()
    if (!userInfo) return <div className="flex items-center">Not logged in.</div>
    const userData = await fetchUserByUsername(params.username)
    const user = JSON.parse(JSON.stringify(userData))
    const selfProfile = (user.id === userInfo.id)
    if(!selfProfile) return <div className="flex items-center">Unauthorized.</div>

  return (
    <div className="flex flex-col justify-start items-center md:min-w-[65vw]">
        <p className="text-xl font-bold font-inter">Edit your profile.</p>
        <UserForm user={user} purpose="Edit Profile"/>
    </div>
  )
}

export default page
