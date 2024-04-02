'use client'

import { sendRequest } from "@/lib/actions/space.actions"
import { usePathname } from "next/navigation"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const RequestButton = ({spaceId, requestPending}) => {
    const path = usePathname()
    const handleRequest = async () => {
        const id = toast.loading("Sending Request...",{theme:'dark'})
        await sendRequest(spaceId, path)
        toast.update(id, { render: "Request sent", type: "success", isLoading: false, theme:'dark', autoClose: 2000 , closeOnClick: true});
    }
  return (
    <button onClick={()=>handleRequest()} disabled={requestPending} className="flex justify-center max-sm:w-full items-center bg-gradient-to-br from-green-400/80 to-green-700/40 hover:opacity-75 rounded-lg max-sm:text-xs px-6 py-2 h-1/2">
        Join
    </button>
  )
}

export default RequestButton
