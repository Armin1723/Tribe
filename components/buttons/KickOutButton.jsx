'use client'

import { kickOutMember } from "@/lib/actions/space.actions"
import { usePathname } from "next/navigation"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const KickOutButton = ({space_name, userId, isMember}) => {
    const path = usePathname()
    const handleKickout = async ()=>{
        const id = toast.loading("Kicking user out...",{theme:'dark'})
        await kickOutMember(space_name, userId, path)
        isMember = false
        console.log(isMember, "path: ",path)
        toast.update(id, { render: "User removed", type: "success", isLoading: false, theme:'dark', autoClose: 2000 , closeOnClick: true});
    }
  return (
    <>{isMember && <button 
                        onClick={()=>handleKickout()} 
                        disabled={!isMember} 
                        className="flex flex-col justify-center items-center max-sm:text-xs rounded-md bg-red-500 border border-red-700 hover:bg-red-600 md:px-4 px-2 py-2 my-2"
                    >
                        Kick Out
                   </button>}
    </>
  )
}

export default KickOutButton
