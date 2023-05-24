'use client'
import { Skeleton } from '@mui/material'
import { TransactionResponse, Utils } from 'alchemy-sdk'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import AccountRowLink from '../(components)/AccountRowLink'
import useFetchBlock from '../(hooks)/useFetchBlock'
import useFetchEthereumPrice from '../(hooks)/useFetchEthereumPrice'
import convertWeiToEth from '../(utils)/convertWeiToEth'
import { alchemy } from '../(utils)/web3/alchemy-client'

export default function TransactionPage() {
  const [transactionInput, setTransactionInput] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const transactionHash = params.get('hash')
  const { data: ethereumPrice, isLoading: ethereumPriceIsLoading } = useFetchEthereumPrice()

  const [transaction, setTransaction] = useState<null | TransactionResponse | undefined>(null)
  const [transactionError, setTransactionError] = useState<null | string>(null)
  const [transactionIsLoading, setTransactionIsLoading] = useState(false)

  const { data: blockData, mutate: blockMutate, isLoading: blockIsLoading } = useFetchBlock()
  useEffect(() => {
    if (transaction) {
      blockMutate(transaction.blockNumber)
    }
  }, [transaction, blockMutate])

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

  const valueEth = transaction?.value && convertWeiToEth(transaction.value)

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
      <button className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-5' onClick={handleReset}>
        Reset input
      </button>
      {transaction && !transactionIsLoading && (
        <>
          <div>
            <b>Transaction hash : </b>
            {transaction.hash}{' '}
          </div>
          {blockData?.timestamp && (
            <h3>
              <strong>Date : </strong>

              {dayjs(blockData.timestamp * 1000).toString()}
            </h3>
          )}
          {blockIsLoading && <Skeleton variant='text' sx={{ fontSize: '1rem', width: '20rem' }} />}
          <div className='font-bold'>Transaction confirmations : {transaction.confirmations}</div>
          <div
            className='text-blue-600 hover:text-blue-900 hover:scale-105 cursor-pointer'
            onClick={() => router.push(`/block?number=${transaction.blockNumber}`)}
          >
            <b>Transaction block number : </b>
            {transaction.blockNumber}
          </div>
          <AccountRowLink text='From :' address={transaction.from} />
          <AccountRowLink text='To :' address={transaction.to as string} />
          <div>Transaction nonce : {transaction.nonce}</div>
          <div>
            <b>Transaction value : </b>
            {valueEth} eth{' '}
            {!ethereumPriceIsLoading && ethereumPrice && !!valueEth && `($${(ethereumPrice * valueEth).toFixed(2)})`}
          </div>
        </>
      )}
      {transactionIsLoading && <Skeleton variant='rounded' width={600} height={200} />}

      {transactionError && <div className='text-red-600 py-4'>Transaction error : {transactionError} </div>}
    </div>
  )
}
