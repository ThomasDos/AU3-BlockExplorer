'use client'
import { FormEvent, useState } from 'react'

export default function TransactionPage() {
  const [transactionInput, setTransactionInput] = useState('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(transactionInput)
  }
  return (
    <div className='text-center p-10'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search a transaction'
          value={transactionInput}
          onChange={(e) => setTransactionInput(e.target.value)}
          className='bg-gray-100 border-rounded border-2 border-gray-300 p-2'
        />
      </form>
    </div>
  )
}
