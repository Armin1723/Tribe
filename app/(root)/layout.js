import '../globals.css'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'
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
          <main className='flex justify-between w-full'>
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
