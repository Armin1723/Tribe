import '../globals.css'
import { Inter } from 'next/font/google'

import Topbar from '@/components/shared/Topbar'
import { ClerkProvider } from '@clerk/nextjs'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'
import NextTopLoader from 'nextjs-toploader';
import { dark } from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Welcome to Tribe',
  description: 'Dashboard of Tribe Tech Community.'
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
      <html lang="en">
        <body className={`${inter.className} flex flex-col w-screen justify-between items-center custom-scrollbar`}>
          <Topbar/>
          <NextTopLoader color="#1A2991" height={2} shadow="0 0 10px #1A2991, 0 0 15px #1A2991"/>
          <main className='flex justify-between max-md:justify-center max-lg:justify-start max-lg:gap-4 w-full'>
            <LeftSidebar/>
            <section>
              <div className='pt-20 '>
                {children}
              </div>
            </section>
            <RightSidebar/>
          </main>
          <Bottombar/>
        </body>
      </html>
    </ClerkProvider>
  )
}
