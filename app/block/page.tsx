'use client'
import useFetchBlock from '@/app/(hooks)/useFetchBlock'
import BlockCard from '@/components/BlockCard'
import { BlockWithTransactions } from 'alchemy-sdk'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import Dots from '../(components)/ui/Dots'

export default function BlockPage() {
  const params = useSearchParams()
  const blockNumber = Number(params.get('number')) as number
  const router = useRouter()

  const [blockInput, setBlockInput] = useState<undefined | number>()

  const { data: latestBlock, mutate: latestBlockMutate, isLoading: latestBlockIsLoading } = useFetchBlock()
  const { data: block, isLoading: blockIsLoading, mutate: blockMutate } = useFetchBlock()
  const randomNumberInTotalBlocks = () => {
    if (!latestBlock) return
    blockMutate(Math.ceil(Math.random() * latestBlock.number))
  }

  useEffect(() => {
    if (!latestBlock && !latestBlockIsLoading) {
      latestBlockMutate('latest')
    }
    if (!blockNumber) {
      return blockMutate('latest')
    }
    blockMutate(blockNumber)
  }, [blockNumber, latestBlock, blockMutate, latestBlockMutate, latestBlockIsLoading])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (blockInput) {
      blockMutate(blockInput)
      router.replace(`/block?number=${blockInput}`)
    }
  }

  return (
    <div className='flex flex-col items-center py-4'>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          value={blockInput}
          onChange={(e) => setBlockInput(Number(e.target.value))}
          className='p-4 border'
          placeholder='Enter a block number'
        />
      </form>
      <span className='font-bold text-xl my-5'>OR</span>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={randomNumberInTotalBlocks}
        disabled={blockIsLoading}
      >
        {blockIsLoading ? <Dots dotscolor='white' /> : 'Generate a random number'}
      </button>
      <BlockCard block={block as BlockWithTransactions} blockIsLoading={blockIsLoading} />
    </div>
  )
}
