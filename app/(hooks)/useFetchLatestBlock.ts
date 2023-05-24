import { alchemy } from '@/app/(utils)/alchemy-client'
import { useMutation } from '@tanstack/react-query'

export default function useFetchLatestBlock() {
  return useMutation(['alchemy-fetch-block'], (blockNumber?: number | string) =>
    alchemy.core.getBlockWithTransactions(blockNumber as number | string)
  )
}
