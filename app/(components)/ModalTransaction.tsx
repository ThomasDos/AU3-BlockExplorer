import { Link, Modal } from '@mui/material'
import { TransactionResponse } from 'alchemy-sdk'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { styled } from 'styled-components'
import convertWeiToEth from '../(utils)/convertWeiToEth'
import AccountRowLink from './AccountRowLink'
import Dots from './ui/Dots'

const StyledContainer = styled.div`
  h2 {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }

  h3 {
    margin-bottom: 6px;
    font-size: 16px;
  }
`

interface ModalTransactionProps {
  selectTransaction: null | TransactionResponse
  handleClose: () => void
}

export default function ModalTransaction({ selectTransaction, handleClose }: ModalTransactionProps) {
  const router = useRouter()
  const handleClickAccount = (accountAddress: string) => {
    handleClose()
    router.push(`/account?address=${accountAddress}`)
  }

  if (!selectTransaction) return null
  return (
    <Modal open={!!selectTransaction} onClose={handleClose} className='flex justify-center items-center'>
      <StyledContainer className='bg-white p-10'>
        {selectTransaction ? (
          <>
            <h2>Hash : {selectTransaction.hash}</h2>
            {selectTransaction.timeStamp && (
              <h3>
                <strong>Date : </strong>

                {dayjs(selectTransaction.timeStamp * 1000).toString()}
              </h3>
            )}
            <AccountRowLink
              text='From :'
              address={selectTransaction.from}
              onClick={() => handleClickAccount(selectTransaction.from)}
            />
            <AccountRowLink
              text='To :'
              address={selectTransaction.to as string}
              onClick={() => selectTransaction.to && handleClickAccount(selectTransaction.to)}
            />
            <h3>
              <strong>Value : </strong>
              {convertWeiToEth(selectTransaction.value)} eth
            </h3>
            <Link href={`/transaction?hash=${selectTransaction.hash}`}>View the full transaction</Link>
          </>
        ) : (
          <Dots dotscolor='blue' />
        )}
      </StyledContainer>
    </Modal>
  )
}
