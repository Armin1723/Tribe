'use client'

import { kickOutMember } from "@/lib/actions/space.actions"
import Image from "next/image";
import { usePathname } from "next/navigation"
import { useState } from "react";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const KickOutButton = ({spacename, userId, isMember}) => {
    const path = usePathname()
    const [working, setWorking] = useState(isMember)
    const handleKickout = async ()=>{
        setWorking(!working)
        const id = toast.loading("Kicking user out...",{theme:'dark'})
        await kickOutMember(spacename, userId, path)
        isMember = false
        toast.update(id, { render: "User removed", type: "success", isLoading: false, theme:'dark', autoClose: 2000 , closeOnClick: true});
    }
  return (
    <>{working ? <button 
                        onClick={()=>handleKickout()} 
                        disabled={!isMember} 
                        className="flex flex-col justify-center items-center max-sm:text-xs rounded-md bg-red-500 border border-red-700 hover:bg-red-600 md:px-4 px-2 py-2 my-2"
                    >
                        Kick Out
                   </button>
                :
                <Image src='/assets/spinner.svg' alt='loading' width={24} height={24} className="mx-12"/>}
    </>
  )
}

export default KickOutButton
