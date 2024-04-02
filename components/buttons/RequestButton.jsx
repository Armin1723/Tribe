'use client'

import { sendRequest } from "@/lib/actions/space.actions"
import { usePathname } from "next/navigation"

const RequestButton = ({spaceId, requestPending}) => {
    const path = usePathname()
    const handleRequest = async () => {
        await sendRequest(spaceId, path)
    }
  return (
    <button onClick={()=>handleRequest()} disabled={requestPending} className="flex justify-center max-sm:w-full items-center bg-gradient-to-br from-green-400/80 to-green-700/40 hover:opacity-75 rounded-lg max-sm:text-xs px-6 py-2 h-1/2">
        Join
    </button>
  )
}

export default RequestButton
