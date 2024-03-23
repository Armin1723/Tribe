"use client"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"


const Pagination = ({hasMore, path, pageNumber}) => {
    const router = useRouter()
    let nextPage = pageNumber

    const handleNav = (direction) => {
        if (direction === "next") {
          nextPage = parseInt(pageNumber) + 1
        }else if (direction === "prev") {
          nextPage = Math.max(1, pageNumber - 1)
        }
        if(nextPage > 1)    router.push(`${path}?page=${nextPage}`)
        else                router.push(`${path}`)
    }
    if (!hasMore && pageNumber === 1) return <p className="flex items-center justify-center my-4">End of List.</p>;

  return (
    <div className="pagination flex justify-center gap-8 items-center py-4 max-sm:mb-[7vh]">
      <Button onClick={()=> handleNav('prev')} disabled={pageNumber === 1} className='hover:bg-gray-800'>Prev</Button>
      <p className='text-small-semibold text-light-1'>{pageNumber}</p>
      <Button onClick={()=> handleNav('next')} disabled={!hasMore} className='hover:bg-gray-800'>Next</Button>
    </div>
  )
}

export default Pagination
