import { Link, Modal, Skeleton } from '@mui/material'
import { TransactionResponse } from 'alchemy-sdk'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { styled } from 'styled-components'
import { TransactionResult } from '../(hooks)/useFetchAccountTransactions'
import useFetchBlock from '../(hooks)/useFetchBlock'
import useFetchEthereumPrice from '../(hooks)/useFetchEthereumPrice'
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
  selectTransaction: null | TransactionResult | TransactionResponse
  handleClose: () => void
}

export default function ModalTransaction({ selectTransaction, handleClose }: ModalTransactionProps) {
  const router = useRouter()
  const handleClickAccount = (accountAddress: string) => {
    handleClose()
    router.push(`/account?address=${accountAddress}`)
  }
  const { data: blockData, mutate: blockMutate, isLoading: blockIsLoading } = useFetchBlock()
  const { data: ethereumPrice, isLoading: ethereumPriceIsLoading } = useFetchEthereumPrice()

  useEffect(() => {
    if (selectTransaction?.blockNumber) {
      blockMutate(Number(selectTransaction.blockNumber))
    }
  }, [selectTransaction, blockMutate])

  if (!selectTransaction) return null

  const valueEth = convertWeiToEth(selectTransaction.value)

  return (
    <Modal open={!!selectTransaction} onClose={handleClose} className='flex justify-center items-center'>
      <StyledContainer className='bg-white p-10'>
        {selectTransaction ? (
          <>
            <h2>Hash : {selectTransaction.hash}</h2>
            {blockData && (
              <h3>
                <strong>Date : </strong>

                {dayjs(blockData.timestamp * 1000).toString()}
              </h3>
            )}
            {blockIsLoading && <Skeleton variant='text' sx={{ fontSize: '1rem', width: '20rem' }} />}
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
              {valueEth} eth {!ethereumPriceIsLoading && ethereumPrice && `($${(ethereumPrice * valueEth).toFixed(2)})`}
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
