import Pagination from "@/components/cards/Pagination"
import SpaceDetailCard from "@/components/cards/SpaceDetailCard"
import ThreadCard from "@/components/cards/ThreadCard"
import { fetchSpace, fetchThreadsBySpacename } from "@/lib/actions/space.actions"
import Link from "next/link"

const page = async ({params, searchParams}) => {
    const result = await fetchSpace(params.spacename.split('-').join(' '))
    let threads = []
    if(result.isMember)
        threads = await fetchThreadsBySpacename(params.spacename.split('-').join(' '),searchParams.page ? searchParams.page : 1, 5)
  return (
    <div className="custom-scrollbar flex flex-col gap-2 justify-center items-center md:w-[67vw] max-lg:min-w-[85vw] max-sm:px-4">
      <SpaceDetailCard space={result.space} isAdmin={result.isAdmin} isMember={result.isMember} requestPending={result.requestPending}/>
      <div className="threadsContainer custom-scrollbar flex flex-col justify-between my-4 min-h-[400vh] w-full">
        {result.isMember ?
            <>
                <ThreadCard threads={threads}/>
                <div className="fixed bottom-0 max-sm:bottom-[10vh] left-[25vh] max-sm:left-0 md:mb-4 mb-1 flex justify-center items-center max-sm:min-w-full hover:opacity-75 max-sm:text-sm">
                    <textarea rows={1} name="thread" className="custom-scrollbar bg-gray-900/50 border border-blue-900 rounded-s-lg text-sm focus:ring-blue-500 focus:outline-none focus:border-blue-500 max-sm:max-w-[90%] w-[60vw] px-6 py-2 text-white" />
                    <button className="flex items-center justify-center px-6 py-2 bg-blue-800 border border-blue-900 rounded-e-lg">Post</button>
                </div>
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
