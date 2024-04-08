import Pagination from "@/components/cards/Pagination"
import SpaceDetailCard from "@/components/cards/SpaceDetailCard"
import ThreadCard from "@/components/cards/ThreadCard"
import { fetchSpace, fetchThreadsBySpacename } from "@/lib/actions/space.actions"
import { ToastContainer } from "react-toastify"

const page = async ({params, searchParams}) => {
    const result = await fetchSpace(params.spacename.split('-').join(' '))
    let threads = []
    if(result?.isMember)
        threads = await fetchThreadsBySpacename(params.spacename.split('-').join(' '),searchParams.page ? searchParams.page : 1, 5)
  return (
    <div className="custom-scrollbar flex flex-col gap-2 justify-center items-center md:w-[67vw] max-lg:min-w-[85vw] max-sm:px-4">
      <ToastContainer/>
      <SpaceDetailCard space={result.space} isAdmin={result.isAdmin} isMember={result.isMember} requestPending={result.requestPending}/>
      <div className="threadsContainer custom-scrollbar flex flex-col justify-between my-4 min-h-[400vh] w-full">
         {result?.isMember ?
            <>
                <ThreadCard threads={threads}/>
                
                {/* <Pagination /> */}
            </>:
                <div className="flex flex-col items-center justify-center gap-4 my-4 max-sm:text-sm italic">
                    <h1 className="text-xl font-bold">Join the space to view threads</h1>
                </div>
        }
      </div> 
    </div>
  )
}

export default page
