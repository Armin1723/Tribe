import Image from "next/image"
import Link from "next/link"

const BlogCard = ({blog}) =>{
    const blogTitleUrl = blog.title.split(' ').join('-')

    return(
        <div key={blog._id} className="BlogCard flex flex-col rounded-md border-2 border-gray-800 bg-[#1f1f1f] p-2 font-serif">
            <Image src={blog.blog_image} alt="blog-image" priority width={24} height={24} className="w-full object-contain user-select-none"/>
            <p className="text-2xl capitalize text-bold">{blog.title}</p>
            <p>
                {blog.description}
                <span className="capitalize text-blue-500 cursor-pointer hover:underline">
                <Link href={`/${blogTitleUrl}`}>See More...</Link>
                </span>               
            </p>

        </div>
    )
}

export default BlogCard