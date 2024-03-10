import BlogCard from "@/components/cards/BlogCard"
import Pagination from "@/components/cards/Pagination";
import { fetchBlogs } from "@/lib/actions/blog.actions"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const Home = async ({searchParams}) =>{
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userID = userInfo._id

  const result = await fetchBlogs(searchParams.page?searchParams.page:1)

  return (
    <>
      <section className="custom-scrollbar flex flex-col justify-center w-full max-sm:px-4 px-8">
        <div className="blogsContainer flex flex-col gap-4">
          {result.blogs.length > 0 ? result.blogs.map((blog)=>{     
            return(
              <BlogCard key={blog._id} blog={blog} userID={userID}/>
            ) 
          }) : <p>Loading...</p>
          }
        </div>     
      </section>
      <Pagination hasMore={result.hasMore} path={'/'} pageNumber={searchParams.page?searchParams.page:1}/>
    </>
  )
}
export default Home;