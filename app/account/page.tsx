'use client'
import { Utils } from 'alchemy-sdk'
import { HexString } from 'ethers/lib.commonjs/utils/data'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ModalTransaction from '../(components)/ModalTransaction'
import Dots from '../(components)/ui/Dots'
import useFetchAccountBalance from '../(hooks)/useFetchAccountBalance'
import useFetchAccountTransactions, { TransactionResult } from '../(hooks)/useFetchAccountTransactions'

export default function AccountPage() {
  const [addressInput, setAddressInput] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const accountAddress = params.get('address') as HexString
  const [transactionSelected, setTransactionSelected] = useState<null | TransactionResult>(null)
  console.log('🚀 ~ file: page.tsx:17 ~ AccountPage ~ transactionSelected:', transactionSelected)

  const {
    mutate: accountBalanceMutate,
    data: accountBalanceData,
    isLoading: accountBalanceIsLoading
  } = useFetchAccountBalance()
  const {
    data: transactions,
    error: transactionsError,
    isLoading: transactionsIsLoading,
    mutate: transactionsMutate
  } = useFetchAccountTransactions()

  useEffect(() => {
    if (!accountAddress) return
    accountBalanceMutate(accountAddress)
    transactionsMutate(accountAddress)
  }, [accountAddress, accountBalanceMutate, transactionsMutate])

  const handleClickTransaction = (transaction: TransactionResult) => {
    setTransactionSelected(transaction)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (accountBalanceIsLoading || transactionsIsLoading) return

    const isHex = Utils.isHexString(addressInput)
    if (isHex) {
      router.replace(`/account?address=${addressInput}`)
      accountBalanceMutate(addressInput)
    }
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <h2>Account Page</h2>
        <div className='my-10'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='please enter an address'
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              className='p-5 border'
            />
          </form>
        </div>
        {(transactionsIsLoading || accountBalanceIsLoading) && <Dots dotscolor='blue' />}
        {accountAddress && !transactionsIsLoading && (
          <>
            <div>Account address : {accountAddress}</div>
            {accountBalanceData && (
              <div>Account Balance : {Number(Utils.formatEther(accountBalanceData._hex)).toFixed(5)} eth</div>
            )}

            {transactions && typeof transactions !== 'string' && !transactionsError && (
              <div>
                <h3 className='my-4 font-bold'>Account Transactions : </h3>
                <ul>
                  {transactions?.map((transaction) => (
                    <li
                      key={transaction.hash}
                      onClick={() => handleClickTransaction(transaction)}
                      className='cursor-pointer hover:text-blue-600'
                    >
                      {transaction.hash}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <ModalTransaction selectTransaction={transactionSelected} handleClose={() => setTransactionSelected(null)} />
    </>
  )
}
