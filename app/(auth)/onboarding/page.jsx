import UserForm from "@/components/forms/UserForm"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"

async function page(){

    const userData = await currentUser()
    const user = JSON.parse(JSON.stringify(userData))

    return(
        <main className="flex flex-ol md:flex-row flex-col-reverse w-screen custom-scrollbar justify-center items-center">
            <div className="h-screen flex flex-col justify-start items-right w-screen p-6 custom-scrollbar md:w-1/2 z-10 max-sm:-mt-[200px]">
                <div className="intro mb-3 ">
                    <h1 className='text-3xl font-bold mb-4 stroke mix-blend-difference'>Onboarding</h1>
                    <p className='leading-5 font-extralight stroke-1'>Welcome to <span className="font-bold">Tribe</span>. A place for like minded tech fanatics and enthusiasts</p>
                </div>
                <UserForm user={user} purpose={"Onboard"}/>
            </div>
            <div className="h-[80vh] border-2 border-blue-800/40 border-x-indigo-950 max-sm:hidden flex justify-center items-center rounded-lg"></div>
            <div className="gif flex flex-col items-center justify-center max-sm:sticky max-sm:top-0 md:h-screen md:w-1/2 max-sm:h-1/5 select-none gap-6">
                <Image src="/assets/duck.gif" alt="" width={200} height={200}/>
                <p className="max-sm:hidden text-xl px-40 text-center">MrDuckoo flamingo awesomeness awaits you. <br />Hurry on Board.</p>
            </div>
        </main>
    )
}

export default page