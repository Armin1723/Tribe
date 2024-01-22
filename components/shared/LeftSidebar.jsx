"use client";
import { sidebarLinks } from "@/constants"
import { usePathname, useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { SignOutButton, SignedIn } from "@clerk/nextjs";

export default function LeftSidebar(){

    const router = useRouter()
    const pathname  = usePathname()

    return(
        <aside className="h-screen pt-28 pb-8 bg-[#1b1b1b] flex flex-col justify-between w-fit sticky left-0 top-0 border-r border-r-[#1f1f1f] overflow-auto max-md:hidden custom-scrollbar">
            <div className="flex flex-col px-6 gap-6">
                {sidebarLinks.map((link) => {
                    const isActive =
                    (pathname.includes(link.route) && link.route.length > 1) ||
                    pathname === link.route;

                    return(
                        <Link href={link.route} key={link.label} className={`${isActive && 'bg-gradient-to-br from-blue-800/40 to-blue-500/80'} rounded-md pl-1 hover:opacity-75`}>
                            <div className="flex items-center gap-2 p-2">
                                <Image src={link.imgURL} alt={link.label} width={20} height={20}/>
                                <p className="font-semibold text-sm max-lg:hidden">{link.label}</p>
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