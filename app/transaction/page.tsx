'use client'
import { TransactionResponse, Utils } from 'alchemy-sdk'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import AccountRowLink from '../(components)/AccountRowLink'
import Dots from '../(components)/ui/Dots'
import { alchemy } from '../(utils)/alchemy-client'
import convertWeiToEth from '../(utils)/convertWeiToEth'

export default function TransactionPage() {
  const [transactionInput, setTransactionInput] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const transactionHash = params.get('hash')

  const [transaction, setTransaction] = useState<null | TransactionResponse | undefined>(null)
  const [transactionError, setTransactionError] = useState<null | string>(null)
  const [transactionIsLoading, setTransactionIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isHex = Utils.isHexString(transactionInput)
    if (isHex) {
      router.replace(`/transaction?hash=${transactionInput}`)
      fetchTransaction(transactionInput)
    }
  }

  const fetchTransaction = (transactionHash: string) => {
    setTransactionIsLoading(true)
    alchemy.core
      .getTransaction(transactionHash)
      .then(setTransaction)
      .catch((e) => setTransactionError(e.message.split('(')[0]))
      .finally(() => setTransactionIsLoading(false))
  }

  const handleReset = () => {
    setTransaction(null)
    setTransactionError(null)
    router.replace(`/transaction`)
  }

  useEffect(() => {
    if (!transactionHash) return
    fetchTransaction(transactionHash)
  }, [transactionHash])

  return (
    <div className='text-center p-10 flex flex-col items-center'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search a transaction'
          value={transactionInput}
          onChange={(e) => setTransactionInput(e.target.value)}
          className='bg-gray-100 border-rounded border-2 border-gray-300 p-2'
        />
      </form>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'
        onClick={handleReset}
      >
        Reset input
      </button>
      {transaction && !transactionIsLoading ? (
        <>
          <div>Transaction hash : {transaction.hash} </div>
          {transaction.timeStamp && (
            <h3>
              <strong>Date : </strong>

              {dayjs(transaction.timeStamp * 1000).toString()}
            </h3>
          )}
          <div className='break-words'>Transaction confirmations : {transaction.confirmations}</div>
          <AccountRowLink text='From :' address={transaction.from} />
          <AccountRowLink text='To :' address={transaction.to as string} />
          <div className='break-words'>Transaction nonce : {transaction.nonce}</div>
          <div className='break-words'>Transaction value : {convertWeiToEth(transaction.value)} eth</div>
        </>
      ) : (
        <div className='my-10'>
          <Dots dotscolor='blue' />
        </div>
      )}

      {transactionError && <div className='text-red-600 py-4'>Transaction error : {transactionError} </div>}
    </div>
  )
}
