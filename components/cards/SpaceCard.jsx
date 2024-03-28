import Image from "next/image"

const SpaceCard = ({space}) => {
  return (
    <div className="flex flex-col font-inter">
        <div className="flex justify-start px-2 rounded-md overflow-hidden hover:bg-gray-900/70 w-full gap-2">
            <Image src={space.space_image} alt="spaceImage" width={48} height={24} className="object-cover w-1/5"/>
            <div className="flex flex-col justify-start py-2">
                <p className="text-lg font-semibold">{space.space_name}</p>
                <p>{space.space_description}</p>
                <p>Members : {space.space_members.length}</p>
            </div>

        </div>
      
    </div>
  )
}

export default SpaceCard
