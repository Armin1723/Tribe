import { fetchTrendingBlogs } from "@/lib/actions/blog.actions"
import Image from "next/image"
import Link from "next/link"

const RightSidebar = async () => {
    const blogs = await fetchTrendingBlogs()
    return(
        <aside className="max-lg:hidden max-w-[20vw] min-w-[20vw] h-screen bg-[#1b1b1b] pt-16 sticky right-0 top-0 flex flex-col justify-start">
            <div className="topBlogs p-4">
                <p className="text-md font-semibold mb-4">Trending Blogs.</p>
                <div className="flex flex-col gap-4">
                    {blogs.length > 0 && blogs.map((blog)=>{
                        return(
                            <Link href={`/blogs/${blog._id}`} className="blogRHS flex gap-2 rounded-md overflow-hidden mx-2 border-[1px] max-h-[8vh] border-gray-700 hover:bg-gray-900/70" key={blog._id}>
                                <Image src={blog.blog_image} alt="blogImage" width={48} height={24} className="object-cover"/>
                                <div className="flex flex-col justify-start pr-2 py-1">
                                    <p className="text-xs font-bold capitalize">{blog.title}</p>
                                    <p className="text-[1.5vh] font-light">{blog.description.trim(10)}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="px-4 flex flex-col">
                <p className="text-md font-semibold mb-4">Suggested Spaces.</p>
                <div className="fle flex-col gap-4 hidden">
                    {blogs.length > 0 && blogs.map((blog)=>{
                        return(
                            <Link href={`/blogs/${blog._id}`} className="blogRHS flex gap-2 rounded-md overflow-hidden mx-2 border-[1px] max-h-[8vh] border-gray-700 hover:bg-gray-900/70" key={blog._id}>
                                <Image src={blog.blog_image} alt="blogImage" width={48} height={24} className="object-cover"/>
                                <div className="flex flex-col justify-start pr-2 py-1">
                                    <p className="text-xs font-bold capitalize">{blog.title}</p>
                                    <p className="text-[1.5vh] font-light">{blog.description.trim(10)}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}

export default RightSidebar