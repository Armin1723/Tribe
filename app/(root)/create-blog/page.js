'use client';
import BlogForm from '@/components/forms/BlogForm';

const createBlog = () => {
  return(
    <div className="blog-container custom-scrollbar flex flex-col gap-[2vh] justify-center max-w-content max-sm:px-4 md:pl-8">
      <h1 className="font-bold text-[3vh]">Create Blog</h1>
      <p className='text-[2vh]'>Here's your space to show your calibre. Start writting...</p>
      <BlogForm/>
    </div>
  )
}

export default createBlog;