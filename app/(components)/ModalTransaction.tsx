import { Link, Modal } from '@mui/material'
import { TransactionResponse } from 'alchemy-sdk'
import Dots from './ui/Dots'

interface ModalTransactionProps {
  selectTransaction: null | TransactionResponse
  handleClose: () => void
}

export default function ModalTransaction({ selectTransaction, handleClose }: ModalTransactionProps) {
  return (
    <Modal open={!!selectTransaction} onClose={handleClose} className='flex justify-center items-center'>
      <div className='bg-white p-10'>
        {selectTransaction ? (
          <>
            <h2>{selectTransaction.hash}</h2>
            <Link href={`/transaction/${selectTransaction.hash}`}>View the full transaction</Link>
          </>
        ) : (
          <Dots dotscolor='blue' />
        )}
      </div>
    </Modal>
  )
}
