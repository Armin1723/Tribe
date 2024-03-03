'use client'
import { useParams } from "next/navigation"

const home = () => {
    const pathname = useParams()
    const title = pathname.blog.toString().split('-').join(' ')
    
    return(
        <div>Hello {title}</div>
    )
}

export default home