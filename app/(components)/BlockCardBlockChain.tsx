import { BlockWithTransactions } from 'alchemy-sdk'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

interface BlockCardProps {
  block: BlockWithTransactions
}

export default function BlockCardBlockChain({ block }: BlockCardProps) {
  const router = useRouter()
  if (!block) return null
  return (
    <div className='py-4 px-2 mx-3 bg-white border border-gray-200 rounded-lg shadow hover:scale-110'>
      <h5 className='mb-2 font-bold tracking-tight text-gray-900'>Block n°{block?.number}</h5>
      <p className='mb-2 text-sm'>
        <b>Date : </b>
        {dayjs(block.timestamp * 1000).toLocaleString()}
      </p>

      <p className='font-normal text-gray-700  cursor-pointer hover:text-blue-700 hover:underline'>
        Transactions : {block.transactions.length}
      </p>

      <p
        className='text-blue-500 hover:text-blue-800 hover:font-bold cursor-pointer'
        onClick={() => {
          router.push(`/block?number=${block.number}`)
        }}
      >
        Show more block&apos;s details
      </p>
    </div>
  )
}
