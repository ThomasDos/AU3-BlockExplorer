import { Modal } from '@mui/material'
import { TransactionResponse } from 'alchemy-sdk'
import { useState } from 'react'
import { alchemy } from '../(utils)/alchemy-client'
import Dots from './ui/Dots'

interface ModalTransactionProps {
  selectTransaction: null | TransactionResponse
  handleClose: () => void
}

export default function ModalTransaction({ selectTransaction, handleClose }: ModalTransactionProps) {
  const [transaction, setTransaction] = useState<null | TransactionResponse | undefined>(null)
  alchemy.core.getTransaction(selectTransaction?.hash as string).then(setTransaction)

  return (
    <Modal open={!!selectTransaction} onClose={handleClose} className='flex justify-center items-center'>
      <div>{transaction ? <h2>{transaction.hash}</h2> : <Dots dotscolor='white' />}</div>
    </Modal>
  )
}
