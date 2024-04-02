'use client'

import { acceptRequest, deleteRequest } from "@/lib/actions/space.actions"
import { usePathname } from "next/navigation"

const SpaceActionButton = ({spacename, userId}) => {
    const path = usePathname()
  return (
    <div className="flex gap-2 items-center justify-center">
        <button onClick={()=>acceptRequest(spacename, userId, path)} className="rounded-md hover:opacity-75 bg-gradient-to-br from-green-600/90 px-2 h-1/2">
         ✓
         <span className="max-sm:hidden px-1">Accept</span>
        </button>
        <button onClick={()=>deleteRequest(spacename, userId, path)} className="rounded-md hover:opacity-75 bg-gradient-to-br from-red-600/90 px-2 h-1/2">
         X
         <span className="max-sm:hidden px-1">Delete</span>
        </button>
    </div>
  )
}

export default SpaceActionButton
