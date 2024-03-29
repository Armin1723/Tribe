import Pagination from "@/components/cards/Pagination"
import { fetchUser, fetchUserSpaces } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const page = async ({searchParams}) => {
    const userInfo = await currentUser()
    if(!userInfo) return redirect('/login')

    const user = await fetchUser(userInfo.id)
    if (!user?.onboarded) return redirect('/onboarding')

    const result = await fetchUserSpaces(user._id, searchParams.page ? searchParams.page : 1)

  return (
    <div className="custom-scrollbar flex flex-col justify-center max-sm:w-screen md:w-[65vw] max-lg:min-w-[88vw] px-4">
        <Image src='/assets/banner.png' alt="banner" priority width={500} height={200} className="w-full object-cover aspect-[16/6] rounded-t-md user-select-none"/>
        <div>
            <h1 className="text-xl font-bold mt-2">Welcome to Spaces</h1>
            <p className="max-sm:text-xs">Spaces are a great way to connect with people who share your interests. You can create a space, join a space, or explore spaces to find one that suits you.</p>
        </div>
        <div className="font-inter flex items-center justify-between w-full md:p-4 p-2 rounded-md bg-gray-900/30 my-2 text-sm">
            <p className="max-sm:text-xs">Wait for nothing. Create your own space.</p>
            <Link href='/spaces/create' className="bg-gradient-to-br from-blue-800/40 to-blue-500/80 hover:opacity-75 rounded-lg max-sm:text-xs px-6 py-2">Create</Link>
        </div>
        <div className="flex items-center justify-center gap-12 font-bold text-blue-900/80 bg-gray-900/30 px-12 rounded-lg py-2 my-4 max-sm:text-[1.5vh]">
            <Link href='/spaces' className="hover:underline [text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)]">Joined</Link>
            <div className="rounded-md min-h-full [text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)] select-none">|</div>
            <Link href='/spaces/explore' className="hover:underline hover:[text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)]">Explore</Link>
        </div>
        <div className="flex flex-col gap-4">
            {result.spaces.length > 0 ? 
                result.spaces.map(space => (
                    <div className="flex items-center justify-between bg-gray-900/30 rounded-md p-4">
                        <Image src={space.space_image} alt={space.space_name} width={100} height={100} className="rounded-md"/>
                        <div>
                            <h2 className="font-bold">{space.space_name}</h2>
                            <p>{space.space_description}</p>
                        </div>
                        <Link href={`/spaces/${space.space_name}`} className="bg-gradient-to-br from-blue-800/40 to-blue-500/80 hover:opacity-75 rounded-lg px-6 py-2">View</Link>
                    </div>
                )) 
                : 
                <p className="text-center text-sm max-sm:text-xs py-2">You have not joined any spaces yet.<br/>Explore spaces to join now</p>}
            <Pagination hasMore={result.hasMore} path='/spaces' pageNumber={1}/>
        </div>
    </div>
  )
}

export default page
