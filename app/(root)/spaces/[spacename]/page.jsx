import Pagination from "@/components/cards/Pagination"
import SpaceDetailCard from "@/components/cards/SpaceDetailCard"
import ThreadCard from "@/components/cards/ThreadCard"
import { fetchSpace, fetchThreadsBySpacename } from "@/lib/actions/space.actions"
import Image from "next/image"
import Link from "next/link"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const page = async ({params, searchParams}) => {
    const result = await fetchSpace(params.spacename.split('-').join(' '))
    let threads = []
    if(result?.isMember)
        threads = await fetchThreadsBySpacename(params.spacename.split('-').join(' '),searchParams.page ? searchParams.page : 1, 5)
  return (
    <div className="custom-scrollbar mb-[10vh] lg:mb-2 flex flex-col gap-2 justify-center items-center md:w-[67vw] max-lg:min-w-[85vw] max-sm:px-4">
      <ToastContainer/>
      <SpaceDetailCard space={result.space} isAdmin={result.isAdmin} isMember={result.isMember} requestPending={result.requestPending}/>
      <Link href={`/spaces/${params.spacename}/create`} className="fixed flex items-center justify-center overflow-hidden lg:bottom-10 bottom-20 right-5 lg:right-[23vw] h-12 z-10 aspect-square rounded-full bg-gradient-to-br from-blue-800/40 to-blue-500/80 hover:opacity-75 shadow-md cursor-pointer">
        <Image src='/assets/create-thread.svg' alt='create thread' width={48} height={48} className=" p-1 w-full aspect-square" ></Image>
      </Link>
      <div className="threadsContainer custom-scrollbar flex flex-col justify-between my-4 w-full">
         {result?.isMember ?
            <>
                <ThreadCard threads={threads.threads}/>   
                <Pagination hasMore={threads.hasMore} path={`/spaces/${params.spacename}`} pageNumber={searchParams.page ? searchParams.page : 1}/>
            </>
            :
                <div className="flex flex-col items-center justify-center gap-4 my-4 max-sm:text-sm italic">
                    <h1 className="text-xl font-bold">Join the space to view threads</h1>
                </div>
          }
      </div> 
    </div>
  )
}

export default page
