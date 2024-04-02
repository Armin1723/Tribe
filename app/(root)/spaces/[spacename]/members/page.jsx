import { fetchSpace } from "@/lib/actions/space.actions"

const page = async ({params}) => {
    const results = await fetchSpace(params.spacename.split('-').join(' '))
  return (
    <div className="requests flex flex-col gap-2 font-inter md:w-[65vw] max-lg:min-w-[88vw] max-sm:px-2">
            <p className="font-bold text-xl my-2">Members.</p>
            <div className="w-full border border-white my-2"></div>
            {results.space.space_members?.length > 1 ?
                results.space.space_members.map((member)=>{
                    return(
                        <div className={`${results.space.space_admin._id.toString() === member._id.toString() ? 'hidden' : ''} flex justify-between w-full rounded-md bg-gray-900/50 gap-2 p-2`} key={member._id}>
                            <div className="flex flex-col">
                                <p className="">{member.alias}</p>
                                <p className='text-xs'>Member ID: {member._id.toString()}</p>
                            </div>
                        </div>
                    )
                }):
                <p>No members other than the admin.</p>
            }
            <div className="w-full border border-white my-2"></div>
        </div>
  )
}

export default page
