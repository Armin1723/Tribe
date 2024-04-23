import { fetchTrendingBlogs } from "@/lib/actions/blog.actions"
import { fetchTrendingSpaces } from "@/lib/actions/space.actions"
import Image from "next/image"
import Link from "next/link"

const RightSidebar = async () => {
    const blogs = await fetchTrendingBlogs()
    const spaces = await fetchTrendingSpaces()
    return(
        <aside className="max-lg:hidden max-w-[20vw] min-w-[20vw] h-screen bg-[#1b1b1b] pt-16 sticky right-0 top-0 flex flex-col justify-start">
            <div className="topBlogs p-4">
                <p className="text-md font-semibold mb-4">Trending Blogs.</p>
                <div className="flex flex-col gap-4">
                    {blogs.length > 0 && blogs.map((blog)=>{
                        return(
                            <Link href={`/blogs/${blog._id}`} shallow className="blogRHS flex gap-2 rounded-md overflow-hidden mx-2 border-[1px] max-h-[8vh] border-gray-700 hover:bg-gray-900/70" key={blog._id}>
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
                <div className="flex flex-col gap-4">
                    {spaces.length > 0 && spaces.map((space)=>{
                        return(
                            <Link href={`/spaces/${space.space_name.split(' ').join('-')}`} shallow className="blogRHS flex gap-2 rounded-md overflow-hidden mx-2 border-[1px] max-h-[8vh] border-gray-700 hover:bg-gray-900/70 " key={space._id}>
                                <Image src={space.space_image} alt="blogImage" width={48} height={48} className="object-cover w-12 border-2 border-gray-400 aspect-square rounded-full m-1"/>
                                <div className="flex flex-col justify-start pr-2 pt-1">
                                    <p className="text-xs font-bold capitalize">{space.space_name}</p>
                                    <p className="text-[1.5vh] font-light">{space.space_description.trim(100)}</p>
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