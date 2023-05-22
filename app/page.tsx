'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className='text-center'>
      <h1 className='text-xl my-6'>Welcome in block explorer</h1>
      <Link href='/block'>
        <span className='text-blue-600 hover:text-blue-900 cursor-pointer'>Visit the block page</span>
      </Link>
    </main>
  )
}
