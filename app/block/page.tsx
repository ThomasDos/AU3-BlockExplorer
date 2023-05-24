'use client'
import ModalTransactions from '@/components//ModalTransactions'
import BlockCard from '@/components/BlockCard'
import useFetchLatestBlock from '@/hooks/useFetchLatestBlock'
import { BlockWithTransactions } from 'alchemy-sdk'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Dots from '../(components)/ui/Dots'

export default function BlockPage() {
  const params = useSearchParams()
  const blockNumber = Number(params.get('number')) as number

  const [selectTransactions, setSelectTransactions] = useState<null | BlockWithTransactions>(null)
  const { data: latestBlock, isLoading: latestBlockIsLoading, mutate: latestBlockMutate } = useFetchLatestBlock()
  const { data: randomBlock, isLoading: randomBlockIsLoading, mutate: randomBlockMutate } = useFetchLatestBlock()
  const randomNumberInTotalBlocks = () => {
    if (!latestBlock) return
    randomBlockMutate(Math.ceil(Math.random() * latestBlock.number))
  }

  useEffect(() => {
    if (!blockNumber) {
      return latestBlockMutate('latest')
    }
    latestBlockMutate(blockNumber)
  }, [blockNumber, latestBlockMutate])

  return (
    <>
      <div className='flex flex-col items-center'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10'
          onClick={randomNumberInTotalBlocks}
          disabled={latestBlockIsLoading || randomBlockIsLoading}
        >
          {randomBlockIsLoading ? <Dots /> : 'Generate a random number'}
        </button>
        <BlockCard
          setSelectTransactions={setSelectTransactions}
          block={latestBlock as BlockWithTransactions}
          blockIsLoading={latestBlockIsLoading}
        />
        {!!randomBlock && (
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
