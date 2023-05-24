'use client'

import { BlockWithTransactions, Utils } from 'alchemy-sdk'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import BlockCardBlockChain from './(components)/BlockCardBlockChain'
import Dots from './(components)/ui/Dots'
import useFetchBlock from './(hooks)/useFetchBlock'

export default function Home() {
  const [explorerInput, setExplorerInput] = useState('')
  const [blocks, setBlocks] = useState<BlockWithTransactions[]>([])
  console.log('🚀 ~ file: page.tsx:11 ~ Home ~ blocks:', blocks)
  const router = useRouter()
  const { isLoading: blockIsLoading, mutateAsync: blockMutate } = useFetchBlock()

  useEffect(() => {
    if (blocks.length || blockIsLoading) return
    const fetchBlocks = async () => {
      const latestBlock = await blockMutate('latest')
      const blockNumber = latestBlock.number
      if (!blockNumber) return

      const blocks: BlockWithTransactions[] = []
      for (let i = blockNumber - 4; i < blockNumber; i++) {
        const block = await blockMutate(i)
        blocks.push(block)
      }
      blocks.push(latestBlock)
      setBlocks(blocks)
    }
    fetchBlocks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!explorerInput || isNaN(explorerInput as any)) return window.alert('Sorry your input is not valid')

    if (Utils.isHexString(explorerInput)) {
      if (explorerInput.length === 42) {
        return router.push(`/account?address=${explorerInput}`)
      }

      return router.push(`/transaction?hash=${explorerInput}`)
    }
    router.push(`/block?number=${explorerInput}`)
  }
  return (
    <main className='text-center flex flex-col items-center'>
      <h1 className='text-xl my-6'>Welcome in block explorer</h1>

      <form onSubmit={handleSubmit} className='w-full'>
        <input
          autoFocus
          type='text'
          value={explorerInput}
          onChange={(e) => setExplorerInput(e.target.value)}
          placeholder='please enter block number / account / Tx hash'
          className='w-6/12 border p-2'
        />
      </form>
      <div className='mt-10'>
        <div className='text-lg font-bold'>Blockchain Ethereum</div>
        <div className='flex my-10'>
          {blockIsLoading ? (
            <Dots dotscolor='blue' />
          ) : (
            !!blocks.length && blocks.map((block) => <BlockCardBlockChain key={block.hash} block={block} />)
          )}
        </div>
      </div>
    </main>
  )
}
