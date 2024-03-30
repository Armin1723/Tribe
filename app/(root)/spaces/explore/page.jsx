import Pagination from "@/components/cards/Pagination"
import { fetchAllSpaces } from "@/lib/actions/space.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import SpaceCard from "@/components/cards/SpaceCard"

const page = async ({searchParams}) => {
    const userInfo = await currentUser()
    if(!userInfo) return redirect('/login')

    const user = await fetchUser(userInfo.id)
    if (!user?.onboarded) return redirect('/onboarding')

    const result = await fetchAllSpaces(searchParams.page ? searchParams.page : 1, 10)

  return (
    <div className="custom-scrollbar flex flex-col justify-center max-sm:w-screen md:w-[65vw] max-lg:min-w-[88vw] px-4 max-sm:mb-[8vh]">
        <Image src='/assets/banner.png' alt="banner" priority width={500} height={200} className="w-full object-cover aspect-[16/6] rounded-t-md user-select-none"/>
        <div className='max-sm:sticky top-[9vh] bg-black'>
            <div className=''>
                <h1 className="text-xl font-bold mt-2">Welcome to Spaces</h1>
                <p className="max-sm:text-xs">Spaces are a great way to connect with people who share your interests. You can create a space, join a space, or explore spaces to find one that suits you.</p>
            </div>
            <div className="font-inter flex items-center justify-between w-full md:p-4 p-2 rounded-md bg-gray-900/30 my-2 text-sm">
                <p className="max-sm:text-xs">Wait for nothing. Create your own space.</p>
                <Link href='/spaces/create' className="bg-gradient-to-br from-blue-800/40 to-blue-500/80 hover:opacity-75 rounded-lg max-sm:text-xs px-6 py-2">Create</Link>
            </div>
        </div>
        <div className="flex items-center justify-center mx-auto gap-12 font-bold text-blue-900/80 bg-gray-900/30 px-12 rounded-lg py-2 my-4 max-sm:text-[1.5vh] md:w-1/2 max-sm:my-1">
            <Link href='/spaces' className="hover:underline hover:[text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)]">Joined</Link>
            <div className="rounded-md min-h-full [text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)] select-none">|</div>
            <Link href='/spaces/explore' className="hover:underline [text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)]">Explore</Link>
        </div>
        <div className="flex flex-col gap-4 my-4">
            {result.spaces.length > 0 && 
                result.spaces.map(space => (
                    <SpaceCard space={space} key={space._id}/>
                )) 
            }
            <Pagination hasMore={result.hasMore} path='/spaces/explore' pageNumber={searchParams.page ? searchParams.page : 1}/>
        </div>
    </div>
  )
}

export default page
