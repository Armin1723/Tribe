import Image from "next/image"
import Link from "next/link"
import RequestButton from "../buttons/RequestButton"

const SpaceDetailCard = ({space, isAdmin, isMember, requestPending}) => {
  return (
    <div className="flex min-w-full max-sm:flex-col justify-between items-center bg-gray-900/30 rounded-md p-2">
        <div className="flex items-center justify-between p-4">
            <div className='flex justify-start gap-4 items-center'>
                <Image src={space.space_image} alt={space.space_name} width={100} height={100} className="rounded-md "/>
                <div className='flex flex-col md:gap-2 text-sm'>
                    <Link href={`/spaces/${space.space_name.split(' ').join('-')}`} className="font-bold text-xl cursor-pointer">{space.space_name}</Link>
                    <p className='font-semibold text-sm'>Admin: <span className='italic underline text-blue-800/50 hover:text-blue-700/40'>{space.space_admin.alias}</span></p> 
                    <Link href={`/spaces/${space.space_name.split(' ').join('-')}/members`} className='max-sm:text-[1.4vh] font-semilight'>Members : {space.space_members?.length}</Link> 
                    <p className='max-sm:text-xs text-gray-300 line-height-[0.8] italic'>"{space.space_description.slice(0,100)}..."</p>                
                </div>
            </div>
        </div>

        {isAdmin && <Link href={`/spaces/${space.space_name.split(' ').join('-')}/manage`} className="flex justify-center max-sm:w-full items-center bg-gradient-to-br from-blue-800/40 to-blue-500/80 hover:opacity-75 rounded-lg max-sm:text-xs px-6 py-2 h-1/2">Manage</Link>}
        {!isMember && (!requestPending ? 
                                    <RequestButton spaceId={space._id.toString()} requestPending={requestPending}/> 
                                    : 
                                    <button disabled className="max-sm:w-full rounded-md px-6 py-2 border-1 border-gray-600 bg-gray-700/50 cursor-not-allowed">Sent </button>
                        )}
    </div>
  )
}

export default SpaceDetailCard
