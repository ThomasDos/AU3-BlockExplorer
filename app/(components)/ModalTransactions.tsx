import { Modal } from '@mui/material'
import { TransactionResponse } from 'alchemy-sdk'
import dynamic from 'next/dynamic'
import { useState } from 'react'
const ModalTransaction = dynamic(() => import('@/components/ModalTransaction'))

interface ModalTransactionsProps {
  open: boolean
  onClose: () => void
  transactions?: TransactionResponse[] | null
}

export default function ModalTransactions({ open, onClose, transactions }: ModalTransactionsProps) {
  const [selectTransaction, setSelectTransaction] = useState<null | TransactionResponse>(null)

  const handleModalTransactionClose = () => {
    setSelectTransaction(null)
  }

  const handleClickTransaction = (transaction: TransactionResponse) => {
    setSelectTransaction(transaction)
  }
  return (
    <Modal open={open} onClose={onClose} className='bg-white'>
      <div className='flex flex-col justify-center items-center w-full py-10 px-2 text-black'>
        <span className='text-xl mb-4'>Transactions list</span>
        <div className='grid grid-cols-2'>
          {transactions?.map((transaction) => {
            return (
              <div
                key={transaction.hash}
                className='w-fit text-sm cursor-pointer hover:text-gray-600'
                onClick={() => handleClickTransaction(transaction)}
              >
                {transaction.hash}
              </div>
            )
          })}
        </div>
        {selectTransaction && (
          <ModalTransaction selectTransaction={selectTransaction} handleClose={handleModalTransactionClose} />
        )}
      </div>
    </Modal>
  )
}
