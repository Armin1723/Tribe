import { fetchUser } from "@/lib/actions/user.actions";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Topbar(){
    const user = await currentUser()
    const userData = await fetchUser(user.id)
    if(!userData) return null
    return(
        <nav className="fixed top-0 bg-[#1b1b1b] w-full z-20 flex items-center justify-between pl-2 py-2 md:max-h-[7vh]">
            <Link href='/' className="flex gap-2 items-center justify-center pl-2">
                <Image src="/assets/logo.svg" alt="logo" width={42} height={42}/>
                <p className="font-extrabold text-xl max-sm:hidden">Tribe</p>
            </Link>
            <div className="flex items-center gap-4">
                <div className="block md:hidden">
                    {userData && <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src="/assets/logout.svg" alt="logout" width={20} height={20}/>
                            </div>
                        </SignOutButton>}
                </div>
                <div className="flex items-center justify-center mt-1">
                    {userData && <Link href={`/users/${userData.username}`} className='mr-8 flex items-center justify-center'>
                        <Image src={userData.image} alt='userImage' width={24} height={24} className="aspect-square w-12 h-12 rounded-full object-cover border-4 border-gray-700 shadow-md shadow-gray-600/50 hover:scale-110"/>
                    </Link>}
                </div>
            </div>
        </nav>
    )
}