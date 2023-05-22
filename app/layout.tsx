import ReactQueryProvider from '@/utils/rq-provider'
import { Inter } from 'next/font/google'
import Footer from './(layout)/footer'
import Navigation from './(layout)/navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Block Explorer',
  description: 'Explore Ethereum blocks, transactions, addresses, and more.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReactQueryProvider>
          <Navigation />
          <div className='h-auto'>{children}</div>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
