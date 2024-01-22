import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Topbar(){
    return(
        <nav className="fixed top-0 bg-[#1b1b1b] w-full z-20 flex items-center justify-between pl-2 py-2">
            <Link href='/' className="flex gap-2 items-center justify-center pl-2">
                <Image src="/assets/logo.svg" alt="logo" width={42} height={42}/>
                <p className="font-extrabold text-xl max-sm:hidden">Tribe</p>
            </Link>
            <div className="flex items-center gap-4">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src="/assets/logout.svg" alt="logout" width={20} height={20}/>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <div className="flex items-center justify-center mt-1">
                    <OrganizationSwitcher
                        appearance={{
                            elements:{
                                organisationSwitcherTrigger:'px-4 font-semibold text-sm'
                            }
                        }}
                    />
                </div>
            </div>
        </nav>
    )
}