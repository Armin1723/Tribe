"use client";
import { usePathname } from "next/navigation"
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"

export default function Bottombar(){
    const pathname = usePathname()

    return(
        <section className="fixed flex gap-2 bottom-0 w-full md:hidden items-center justify-between px-6 py-2 bg-gradient-to-t from-[#1b1b1b] to-gray-900 rounded-t-md">
            {sidebarLinks.map((link =>{
                const isActive = ( pathname.includes === link.route && pathname.length > 1 ) || pathname === link.route
                const isCreateBlog = link.label === 'Create Blog'

                return(
                    <Link href={link.route} key={link.label} className={`${isActive && 'bg-gradient-to-br from-blue-800/40 to-blue-500/80'} ${isCreateBlog && 'font-extrabold scale-125'} flex flex-col items-center justify-center p-2 rounded-3xl sm:rounded-lg sm:px-4 sm:py-1 sm:hover:opacity-75`}>
                        <div className="flex items-center justify-center rounded-full p-2">
                            <Image src={link.imgURL} alt={link.label} height={16} width={16}/>
                        </div>
                        <p className="max-sm:hidden text-sm">{link.label.split(/\s+/)[0]}</p>
                    </Link>
                )
            })
            )}
        </section>
    )
}