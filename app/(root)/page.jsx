import BlogCard from "@/components/cards/BlogCard"
import { fetchBlogs } from "@/lib/actions/blog.actions"

const Home = async () =>{

  const blogs = await fetchBlogs()

  return (
    <>
      <section className="custom-scrollbar flex flex-col justify-center w-full max-sm:px-4 px-8">
        <div className="blogsContainer flex flex-col gap-4">
          {blogs.length > 0 ? blogs.map((blog)=>{     
            return(
              <BlogCard key={blog._id} blog={blog}/>
            ) 
          }) : <p>Loading...</p>
          }
        </div>     
      </section>
    </>
  )
}
export default Home;