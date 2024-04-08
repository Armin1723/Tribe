import { fetchSingleBlog } from "@/lib/actions/blog.actions"
import Image from "next/image"
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import LikeBlogButton from "@/components/buttons/LikeBlogButton";
import ShareButton from "@/components/buttons/ShareButton";

async function Home ({params}) {
    const blogID = params.blog;
    const blog = await fetchSingleBlog(blogID);
    const user = await currentUser();
    const userID = await fetchUser(user.id)
    if(!blog) return <h1 className="text-white mt-[7vh]">Not Found.</h1>
    const isLiked = (blog.likes.length > 0 && blog.likes?.includes(userID._id)) 

    return(
        <div className="md:mx-4 max-sm:px-4 mb-4 flex flex-col max-sm:mb-[8vh] md:max-w-[65vw] max-w-[100vw]">
            <Image src={blog.blog_image} alt="blog_image" width={24} height={24} className="object-cover w-full aspect-[16/8]"/>
            <div className="sticky top-[6.4vh] max-sm:top-[7.4vh] bg-black py-2 text-[4vh] font-bold font-inter ">{blog.title}</div>
            <div className="authorDetails flex max-sm:flex-col max-sm:items-start gap-2 p-2 rounded-md text-[#c4c3c3] items-center justify-between md:px-8 md:my-2 bg-gray-900/50 ">
                <div className="left flex gap-4 max-sm:flex-start">
                    <Link href={`/users/${blog.author.username}`} ><Image src={blog.author.image} alt='user' width={48} height={48} className="rounded-full object-contain aspect-square border-2 border-gray-700"></Image></Link>
                    <Link href={`/users/${blog.author.username}`} className="flex flex-col justify-center" >
                        <div className="capitalize">{blog.author.name}</div>
                        <div className="text-xs italic hover:text-blue-600 text-blue-800">@{blog.author.username}</div>
                    </Link>
                </div>
                <p className="text-xs right italic text-gray-600">Created at: {blog.date.toString()}</p>
            </div>
            <div className="blog text-wrap overflow-x-hidden" dangerouslySetInnerHTML={{__html: blog.content}}></div>


            { userID._id.toString().length <= 0 && <div className="bg-[#1f1f1f] my-4 py-4 flex flex-col items-center rounded-md">
                <Link href='/login' className="text-xs italic text-gray-600 flex flex-col items-center gap-4">
                    <p className="text-[2vh] text-white">Login to interact and explore similar blogs.</p>
                    <button className="bg-gradient-to-br from-blue-700/40 to-blue-600/70 border-2 border-blue-800 rounded-md hover:bg-gradient-to-r cursor-pointer outline-none py-2 px-4 text-white">Login</button>
                </Link>
                </div>} 

            <div className="flex max-sm:flex-col md:justify-between px-4 items-center bg-gray-900/60 rounded-md py-4 mt-4 max-sm:gap-2">
                <p className="font-inter font-light max-sm:px-4 max-sm:text-[2vh] leading-tight text-center">Intrigued with what you read? Give it a heart or share with your friends.</p>
                <div className="flex">
                    <LikeBlogButton blogID={blog._id} isLiked={isLiked} userID={userID._id} />
                    <ShareButton title={blog.title} text={blog.description} />
                </div>
            </div>

        </div>
    )
}

export default Home