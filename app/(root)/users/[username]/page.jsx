import { fetchUserByUsername } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


async function page ({params}){
    const user = await fetchUserByUsername(params.username)
    const userInfo = await currentUser()
    const selfProfile = user.id === userInfo.id
    return(
        <div className="custom-scrollbar flex flex-col justify-center max-lg:min-w-[85vw] items-center w-full md:w-[65vw] text-white font-inter max-sm:px-4 px-2">
            <Image src='/assets/banner.png' alt="banner" width={500} height={200} className="w-full object-cover aspect-[16/6] rounded-t-md user-select-none"/>
            <div className=" w-full flex px-4 h-[30vh] justify-between ">
                <div className="flex justify-start gap-4 max-sm:gap-2">
                    <Image src={user.image} alt="userImage" width={200} height={100} className="relative -mt-[6vw] max-sm:-mt-[4vw] max-w-[20vw] max-h-[20vw] object-cover rounded-full h-full border-4 border-gray-700/50 aspect-square backdrop-blur-lg "/>
                    <div className="details flex flex-col py-4 max-sm:py-1">
                        <p className="font-inter font-semibold text-[3vh] max-sm:text-[2vh] capitalize">{user.name}</p>
                        <Link href={`/users/${user.username}`} className={`${!selfProfile && 'hidden'}text-blue-700/70 text-[2vh] max-sm:text-[1.3vh] underline cursor-pointer text-blue-700`}>@{user.username}</Link>
                        <p className="md:mt-2 font-semibold max-sm:text-[1.3vh]">Blogs: {user.blogs.length}</p>
                    </div>
                </div>
                <Link href={`/users/${user.username}/edit`} className=" items-start flex justify-center"><button className="bg-gradient-to-br from-blue-700/70 to-blue-400/40 hover:bg-gradient-to-r rounded-md text-sm px-6 py-2 my-4">Edit</button></Link>
            </div>
            
        </div>
    )
}

export default page;