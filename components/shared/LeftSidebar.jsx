'use client'
import { sidebarLinks } from "@/constants"
import { usePathname, useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

export default function LeftSidebar(){

    const router = useRouter()
    const pathname  = usePathname()
    const {userId} = useAuth()

    return(
        <aside className="h-screen pt-28 pb-8 bg-[#1b1b1b] flex flex-col justify-between min-w-fit sticky left-0 top-0 border-r border-r-[#1f1f1f] overflow-auto max-md:hidden custom-scrollbar">
            <div className="flex flex-col max-md:px-6 gap-6 mx-4">
                {sidebarLinks.map((link) => {
                    const isActive =
                    (pathname.includes(link.route) && link.route.length > 1) ||
                    (pathname.includes(link.label) && link.label === 'users') ||
                    pathname === link.route;
                    
                    const placeholder = 'username'
                    if(link.route === '/users')  link.route= `/users/${placeholder}`

                    return(
                        <Link href={link.route} key={link.label} className={`${isActive && 'bg-gradient-to-br from-blue-800/40 to-blue-500/80 '} rounded-md pl-1 hover:opacity-75`}>
                            <div className="flex items-center gap-2 md:p-2 ">
                                <Image src={link.imgURL} alt={link.label} width={20} height={20} className="text-[5vh] object-contain"/>
                                <p className="font-semibold text-sm max-lg:hidden">{link.label === 'users' ? 'Profile' : link.label }</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className="font-semibold text-sm flex items-center justify-center">
                <SignedIn>
                    <SignOutButton signOutCallback={()=> router.push('/login')}>
                        <div className="flex cursor-pointer gap-2 items-center hover:opacity-75">
                            <Image src="/assets/logout.svg" alt="logout" width={28} height={28}/>
                            <p className="max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </aside>
    )
}