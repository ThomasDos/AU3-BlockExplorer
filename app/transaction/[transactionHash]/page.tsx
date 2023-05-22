'use client'
import { alchemy } from '@/app/(utils)/alchemy-client'
import { TransactionResponse } from 'alchemy-sdk'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function TransactionHash() {
  const params = useParams()
  const { transactionHash } = params
  const [transaction, setTransaction] = useState<null | TransactionResponse | undefined>(null)
  alchemy.core.getTransaction(transactionHash as string).then(setTransaction)
  return (
    <div>
      <h2>{transaction?.hash}</h2>
    </div>
  )
}
