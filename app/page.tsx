'use client'

import { Utils } from 'alchemy-sdk'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const [explorerInput, setExplorerInput] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!explorerInput || isNaN(explorerInput as any)) return window.alert('Sorry your input is not valid')

    if (Utils.isHexString(explorerInput)) {
      if (explorerInput.length === 42) {
        return router.push(`/account?address=${explorerInput}`)
      }

      return router.push(`/transaction?hash=${explorerInput}`)
    }
    router.push(`/block?number=${explorerInput}`)
  }
  return (
    <main className='text-center flex flex-col items-center'>
      <h1 className='text-xl my-6'>Welcome in block explorer</h1>

      <form onSubmit={handleSubmit} className='w-full'>
        <input
          autoFocus
          type='text'
          value={explorerInput}
          onChange={(e) => setExplorerInput(e.target.value)}
          placeholder='please enter block number / account / Tx hash'
          className='w-6/12 border p-2'
        />
      </form>
    </main>
  )
}
