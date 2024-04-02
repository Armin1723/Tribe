'use client'

import BlogCard from "@/components/cards/BlogCard"
import { searchBlogs } from '@/lib/actions/blog.actions'

const page = () => {
    let query = ''
    let results = []
    const handleSearch = async () => {
        results = await searchBlogs(query, '/search')
    }
    return(
        <div className="custom-scrollbar flex justify-start w-full">
            <div className="fixed top-[8vh] max-sm:max-h-fit max-sm:top-[13vh] overflow-hidden max-sm:bottom-[10vh] left-[25vh] max-sm:left-0 flex justify-center max-sm:min-w-full hover:opacity-75 max-sm:text-sm">
                <textarea 
                        rows={1} 
                        name="thread" 
                        value={query} 
                        onChange={e => query = e.target.value} 
                        className="custom-scrollbar bg-gray-900/50 border border-blue-900 rounded-s-lg text-sm focus:ring-blue-800 focus:outline-none focus:border-blue-500 max-sm:max-w-[90%] w-[57vw] px-6 py-2 text-white" 
                />
                <button onClick={()=>handleSearch()} className="flex items-center justify-center px-6 py-2 bg-blue-800 rounded-e-lg">Search</button>
            </div>

            {(results?.length>0) ? 
                results.map((result)=>{
                    return(
                        <div className="flex flex-col mt-12 gap-2" key={result._id}>
                            <BlogCard  blog={result} userID={result.author._id}/>
                        </div>
                    )
                }):
                (!query ? <p className="mt-12 max-sm:mt-16">Enter Something to search</p> : <p className="mt-12 max-sm:mt-16">No result found</p>)
            }
        </div>
    )
}

export default page;