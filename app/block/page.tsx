'use client'
import ModalTransactions from '@/components//ModalTransactions'
import BlockCard from '@/components/BlockCard'
import useFetchLatestBlock from '@/hooks/useFetchLatestBlock'
import { BlockWithTransactions } from 'alchemy-sdk'
import { useState } from 'react'

export default function BlockPage() {
  const [randomNumber, setRandomNumber] = useState<undefined | number>()
  const [selectTransactions, setSelectTransactions] = useState<null | BlockWithTransactions>(null)
  const { data: latestBlock, isLoading: latestBlockIsLoading } = useFetchLatestBlock('latest')
  const { data: randomBlock, isLoading: randomBlockIsLoading, refetch } = useFetchLatestBlock(randomNumber)
  const randomNumberInTotalBlocks = () => {
    if (!latestBlock) return
    setRandomNumber(Math.floor(Math.random() * latestBlock.number))
    refetch()
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <BlockCard
          setSelectTransactions={setSelectTransactions}
          block={latestBlock as BlockWithTransactions}
          blockIsLoading={latestBlockIsLoading}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={randomNumberInTotalBlocks}
          disabled={latestBlockIsLoading}
        >
          Generate a random number
        </button>
        {!!randomNumber && (
          <BlockCard
            block={randomBlock as BlockWithTransactions}
            blockIsLoading={randomBlockIsLoading}
            setSelectTransactions={setSelectTransactions}
          />
        )}
      </div>
      <ModalTransactions
        open={!!selectTransactions}
        onClose={() => setSelectTransactions(null)}
        transactions={selectTransactions?.transactions}
      />
    </>
  )
}
