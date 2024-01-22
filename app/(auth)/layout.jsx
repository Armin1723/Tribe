import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Inter } from "next/font/google"
import '../globals.css'
import Image from "next/image"

export const metadata = {
    title: 'Tribe',
    description: 'Tribe is a social network for tech communities where users can blog or chat with like minded individuals while being pseudonymous.'
}

const inter = Inter({subsets: ['latin']})

export default function RootLayout({ children }) {
    return(
        <ClerkProvider appearance={{baseTheme: dark}}>
            <html lang='en'>
                <body className={`${inter.className} flex flex-col md:flex-row gap-6 md:gap-0 bg-black text-white justify-center items-center min-h-screen w-[100vw]`}>
                    <div className="h-full flex items-center justify-center relative">
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}