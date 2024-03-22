import BlogCard from "@/components/cards/BlogCard";
import Pagination from "@/components/cards/Pagination";
import { fetchBlogsByUser, fetchUserByUsername } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


async function page ({params, searchParams}){
    const user = await fetchUserByUsername(params.username)
    const userInfo = await currentUser()
    if (!user) return <div>User not found.</div>
    const selfProfile = (user.id === userInfo.id)

    const result = await fetchBlogsByUser(user._id, searchParams.page?searchParams.page:1, 2)

    return(
        <div className="custom-scrollbar flex flex-col justify-center max-lg:min-w-[85vw] items-center w-full md:w-[65vw] text-white font-inter max-sm:px-4 px-2">
            <Image src='/assets/banner.png' alt="banner" width={500} height={200} className="w-full object-cover aspect-[16/6] rounded-t-md user-select-none"/>
            <div className=" w-full flex px-4 h-[30vh] max-sm:h-[20vh] justify-between relative ">
                <div className="flex justify-start gap-4 max-sm:gap-2">
                    <Image src={user.image} priority alt="userImage" width={220} height={100} className="relative -mt-[6vw] max-sm:-mt-[4vw] max-lg:-mt-[4vw] max-w-[20vw] max-h-[20vw] object-cover rounded-full border-4 border-gray-700/50 aspect-square h-full backdrop-blur-lg "/>
                    <div className="details flex flex-col py-4 max-sm:py-1">
                        <p className="font-inter font-semibold text-[3vh] max-sm:text-[2vh] capitalize">{user.name}</p>
                        <Link href={`/users/${user.username}`} className="text-blue-700/70 text-[2vh] max-sm:text-[1.3vh] underline cursor-pointer">@{user.username}</Link>
                        <p className="md:mt-2 font-semibold max-sm:text-[1.3vh]">Blogs: {user.blogs.length}</p>
                    </div>
                </div>
                <Link href={`/users/${user.username}/edit`} className={`${!selfProfile && 'hidden'} items-start flex justify-center`}><button className="bg-gradient-to-br from-blue-800/70 to-blue-400/40 hover:bg-gradient-to-r rounded-md text-sm px-6 py-2 my-4">Edit</button></Link>
                <div className="absolute bottom-4 flex items-center justify-center gap-12 w-full font-bold text-blue-900/80 py-4 left-0 bg-gray-900/30 rounded-lg text-md max-sm:text-sm min-h-fit ">
                    <Link href={`/users/${user.username}`} className="hover:underline hover:[text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)]">Blogs</Link>
                    <div className="rounded-md min-h-full [text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)] select-none">|</div>
                    <Link href={`/users/${user.username}/spaces`} className="hover:underline hover:[text-shadow:_1px_1px_15px_rgb(0_10_225_/_90%)]">Spaces</Link>
                </div>
            </div>

            <div className="blogsContainer flex flex-col gap-4 mx-4">
            {result.blogs.length > 0 ? result.blogs.map((blog)=>{     
                return(
                <BlogCard key={blog._id} blog={blog} userID={user._id}/>
                ) 
            }) : <p>No blogs to show.</p>
            }
            </div> 

            <Pagination hasMore={result.hasMore} path={`/users/${user.username}`} pageNumber={searchParams.page?searchParams.page:1} />    
            
        </div>
    )
}

export default page;