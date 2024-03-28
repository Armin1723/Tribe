import Image from "next/image"
import Link from "next/link"

const SpaceCard = ({space}) => {
  return (
    <div className="flex items-center justify-between bg-gray-900/30 rounded-md p-4" key={space._id}>
        <div className='flex justify-start gap-4 items-center'>
            <Image src={space.space_image} alt={space.space_name} width={100} height={100} className="rounded-md max-sm:w-ft max-sm:h-ft"/>
            <div className='flex flex-col md:gap-2 text-sm'>
                <Link href={`/spaces/${space.space_name.split(' ').join('-')}`} className="font-bold text-xl cursor-pointer">{space.space_name}</Link>
                <p className='font-semibold italic text-blue-800/50 underline hover:text-blue-700/40 text-sm'>{space.space_admin.alias}</p> 
                <p className='max-sm:text-[1.4vh] font-semilight'>Members : {space.space_members.length}</p> 
                <p className='max-sm:text-xs text-gray-300 line-height-[0.8] italic'>"{space.space_description.slice(0,100)}..."</p>                
            </div>
        </div>
    </div>
  )
}

export default SpaceCard
