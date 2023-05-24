import { Collapse } from '@mui/material'
import { BigNumberish, BlockWithTransactions, TransactionResponse, Utils } from 'alchemy-sdk'
import dayjs from 'dayjs'
import { useState } from 'react'
import ModalTransaction from './ModalTransaction'
import Dots from './ui/Dots'

interface BlockCardProps {
  block: BlockWithTransactions
  blockIsLoading: boolean
}

export default function BlockCard({ block, blockIsLoading }: BlockCardProps) {
  const [showTransactions, setShowTransactions] = useState(false)
  const [selectTransaction, setSelectTransaction] = useState<null | TransactionResponse>(null)
  return (
    <>
      <div className='my-10 block p-4 bg-white border border-gray-200 rounded-lg shadow'>
        {blockIsLoading || !block ? (
          <Dots dotscolor='blue' />
        ) : (
          <>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Block n°{block?.number}</h5>

            <p className='mb-2 text-lg'>
              <b>Date : </b>
              {dayjs(block.timestamp * 1000).toLocaleString()}
            </p>

            <p className='font-normal text-gray-700  cursor-pointer hover:text-blue-700 hover:underline'>
              Transactions : {block.transactions.length}
            </p>
            {block.baseFeePerGas?._hex && (
              <p>Base fee : {Utils.formatEther(block.baseFeePerGas?._hex as BigNumberish)} eth</p>
            )}
            <p
              onClick={() => setShowTransactions(!showTransactions)}
              className='cursor-pointer hover:text-blue-500 text-blue-800'
            >
              {showTransactions ? 'Hide ' : 'Show '} transactions
            </p>
            <Collapse in={showTransactions}>
              <div className='flex flex-col justify-center items-center w-full py-10 px-2 text-black'>
                <span className='text-xl mb-4'>Transactions list</span>
                <div className='flex-col'>
                  {block.transactions?.map((transaction) => {
                    return (
                      <div
                        key={transaction.hash}
                        className='w-fit text-sm cursor-pointer hover:text-blue-600 my-1'
                        onClick={() => setSelectTransaction(transaction)}
                      >
                        {transaction.hash}
                      </div>
                    )
                  })}
                </div>
              </div>
            </Collapse>
          </>
        )}
      </div>
      <ModalTransaction selectTransaction={selectTransaction} handleClose={() => setSelectTransaction(null)} />
    </>
  )
}
