import { BigNumberish, BlockWithTransactions, Utils } from 'alchemy-sdk'
import Dots from './ui/Dots'

interface BlockCardProps {
  block: BlockWithTransactions
  blockIsLoading: boolean
  setSelectTransactions: (block: BlockWithTransactions) => void
}

export default function BlockCard({ block, blockIsLoading, setSelectTransactions }: BlockCardProps) {
  return (
    <div className='my-10 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      {blockIsLoading || !block ? (
        <Dots />
      ) : (
        <>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Latest Block n°{blockIsLoading ? ' loading...' : block?.number}
          </h5>

          <p
            className='font-normal text-gray-700 dark:text-gray-400 cursor-pointer hover:text-blue-700 hover:underline'
            onClick={() => setSelectTransactions(block)}
          >
            Transactions : {block.transactions.length}
          </p>
          {block.baseFeePerGas?._hex && (
            <p>Base fee : {Utils.formatEther(block.baseFeePerGas?._hex as BigNumberish)} eth</p>
          )}
          <p></p>
        </>
      )}
    </div>
  )
}
