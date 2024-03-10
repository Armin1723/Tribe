import { fetchSingleBlog } from "@/lib/actions/blog.actions"
import ActivityCard from "@/components/cards/ActivityCard"
import Image from "next/image"
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';



const home = async ({params}) => {
    const blogID = params.blog;
    const blog = await fetchSingleBlog(blogID);
    if(!blog) return <h1 className="text-white mt-[7vh]">Not Found.</h1>
    const sanitizedHtml = DOMPurify.sanitize(blog.content);

    return(
        <div className="mx-4 mb-4 flex flex-col max-sm:mb-[8vh] md:max-w-[65vw] max-w-[100vw] overflow-x-hidden">
            <Image src={blog.blog_image} alt="blog_image" width={24} height={24} className="object-cover w-full aspect-[16/8]"/>
            <div className="sticky top-[7vh] bg-black py-2 text-[4vh] font-bold font-inter">{blog.title}</div>
            <div className="authorDetails flex max-sm:flex-col max-sm:items-start gap-2 p-2 rounded-md text-[#c4c3c3] items-center justify-between md:px-8 md:my-2 bg-gray-900/50 ">
                <div className="left flex gap-4 max-sm:flex-start">
                    <Link href={`/user/${blog.author.username}`} ><Image src={blog.author.image} alt='user' width={48} height={48} className="rounded-full object-contain aspect-square border-2 border-gray-700"></Image></Link>
                    <Link href={`/user/${blog.author.username}`} className="flex flex-col justify-center" >
                        <div className="capitalize">{blog.author.name}</div>
                        <div className="text-xs italic hover:text-gray-300">@{blog.author.username}</div>
                    </Link>
                </div>
                <p className="text-xs right italic text-gray-600">Created at: {blog.date.toString()}</p>
            </div>
            <div className="blog text-wrap" dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>

            <ActivityCard blog={blog}/>
        </div>
    )
}

export default home