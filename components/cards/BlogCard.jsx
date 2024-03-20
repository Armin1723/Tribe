import Image from "next/image"
import Link from "next/link"

const BlogCard = async ({blog, userID}) =>{
    const isLiked = (blog.likes.length > 0) && blog.likes.includes(userID);
 
    return(
        <div key={blog._id} className="BlogCard flex flex-col rounded-md border-2 border-gray-800 bg-[#1f1f1f] p-2 font-serif min-w-[65vw]">
            <Image src={blog.blog_image} alt="blog-image" priority width={24} height={24} className="w-full object-cover user-select-none aspect-[16/8]"/>
            <div className="authorDetails flex justify-between p-2 items-center gap-4 bg-gray-900/70">
                <div className="flex gap-2">
                    <Image src={blog.author.image} alt="author-image" width={24} height={24} className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"/>
                    <div className="flex flex-col justify-center">
                        <p className="capitalize text-semibold">{blog.author.name}</p>
                        <Link href={`/users/${blog.author.username}`} className="font-light text-xs hover:underline hover:opacity-60 text-blue-500/60" >@{blog.author.username}</Link>
                    </div>
                </div>
                <div className="likes flex flex-col items-center justify-center ">
                    {isLiked ? 
                            <Image src='/assets/heart-filled.svg' alt='likes' width={24} height={24} className="text-red-700"></Image>
                        :   <Image src='/assets/heart-gray.svg' alt='likes' width={24} height={24} className="text-red-700"></Image>
                    }
                    <div className="likes text-xs text-gray-500">{blog.likes.length}</div>
                </div>
            </div>
            <Link href={`/blogs/${blog._id}`}>
                <p className="text-2xl capitalize text-bold">{blog.title}</p>
                <p>{blog.description}</p>
            </Link>

        </div>
    )
}

export default BlogCard