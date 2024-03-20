import { checkForLike, toggleLike } from "@/lib/actions/blog.actions";
import Image from "next/image";


const ActivityCard = async ({blog, userID}) => {

    const isLiked = checkForLike(blog._id, userID._id)

  return (
    <>
      {/* Redirective in case of no user.*/}
      { !userID.toString().length > 0 && <div className="bg-[#1f1f1f] my-4 py-4 flex flex-col items-center rounded-md">
        <Link href='/login' className="text-xs italic text-gray-600 flex flex-col items-center gap-4">
            <p className="text-[2vh] text-white">Login to interact and explore similar blogs.</p>
            <button className="bg-gradient-to-br from-blue-700/40 to-blue-600/70 border-2 border-blue-800 rounded-md hover:bg-gradient-to-r cursor-pointer outline-none py-2 px-4 text-white">Login</button>
        </Link>
        </div>} 

        {/* Like Card */}
        <div className="flex max-sm:flex-col md:justify-between px-4 items-center bg-gray-900/60 rounded-md py-4 mt-4 max-sm:gap-2">
            <p className="font-inter font-light max-sm:px-4 max-sm:text-[2vh] leading-tight text-center">Intrigued with what you read? Give it a heart or share with your friends.</p>
            <button className="links flex justify-center" onClick={toggleLike(blog._id, userID._id)}>
                { isLiked ? 
                            <Image src='/assets/heart-filled.svg' alt="like" width={48} height={48} className="hover:drop-shadow-lg shadow-red-600 cursor-pointer hover:shadow-lg hover:scale-110"></Image>
                        :   <Image src='/assets/heart-gray.svg' alt="like" width={48} height={48} className="hover:drop-shadow-lg shadow-red-600 cursor-pointer hover:shadow-lg hover:scale-110"></Image> }
            </button>
        </div>
    </>
  )
}

export default ActivityCard
