'use client'
import useFetchBlock from '@/app/(hooks)/useFetchBlock'
import BlockCard from '@/components/BlockCard'
import { BlockWithTransactions } from 'alchemy-sdk'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import styled from 'styled-components'
import Dots from '../(components)/ui/Dots'

const StyledBackUp = styled.div`
  position: fixed;
  top: 10rem;
  left: 5rem;
  background-color: grey;
  padding: 5px;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`

export default function BlockPage() {
  const params = useSearchParams()
  const blockNumber = Number(params.get('number')) as number

  const { data: latestBlock, isLoading: latestBlockIsLoading, mutate: latestBlockMutate } = useFetchBlock()
  const { data: randomBlock, isLoading: randomBlockIsLoading, mutate: randomBlockMutate } = useFetchBlock()
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
      <div className='flex flex-col items-center py-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10'
          onClick={randomNumberInTotalBlocks}
          disabled={latestBlockIsLoading || randomBlockIsLoading}
        >
          {randomBlockIsLoading ? <Dots dotscolor='white' /> : 'Generate a random number'}
        </button>
        <BlockCard block={latestBlock as BlockWithTransactions} blockIsLoading={latestBlockIsLoading} />
        {!!randomBlock && (
          <BlockCard block={randomBlock as BlockWithTransactions} blockIsLoading={randomBlockIsLoading} />
        )}
      </div>
      <StyledBackUp
        onClick={() => {
          window.scrollTo(0, 0)
        }}
      >
        Back up
      </StyledBackUp>
    </>
  )
}
