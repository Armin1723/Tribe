import UserForm from "@/components/forms/UserForm"
import { fetchUser } from "@/lib/actions/user.action"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"

async function page(){

    const userData = await currentUser()
    const userInfo = await fetchUser(userData.id)
    let user = ''
    if(!userInfo)   user = JSON.parse(JSON.stringify(userData))
    else            user = JSON.parse(JSON.stringify(userInfo))

    return(
        <main className="flex md:flex-row flex-col-reverse w-screen justify-center items-center">
            <div className="h-screen flex flex-col justify-start items-right w-screen p-6 md:w-1/2 z-10 max-sm:-mt-[20px]">
                <div className="intro mb-3 ">
                    <h1 className='text-3xl font-bold mb-4 stroke mix-blend-difference'>Onboarding</h1>
                    <p className='leading-5 font-extralight stroke-1'>Welcome to <span className="font-bold">Tribe</span>. A place for like minded tech fanatics and enthusiasts</p>
                </div>
                <UserForm user={user} purpose={"Onboard"}/>
            </div>
            <div className="h-[80vh] border-2 border-blue-800/40 max-sm:hidden flex justify-center items-center rounded-lg shadow-md shadow-slate-400"></div>
            <div className="gif flex flex-col items-center justify-center max-sm:sticky max-sm:top-0 md:h-screen md:w-1/2 max-sm:h-1/5 select-none gap-6 ">
                <Image src="/assets/onboarding.gif" alt="/assets/logo.svg" width={200} height={200}/>
                <p className="max-sm:hidden text-xl px-10 text-center text-white font-bold">Tribe Community awesomeness awaits you. <br />Hurry on Board.</p>
            </div>
        </main>
    )
}

export default page