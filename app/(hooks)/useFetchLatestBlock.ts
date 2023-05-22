import { alchemy } from '@/app/(utils)/alchemy-client'
import { useQuery } from '@tanstack/react-query'

export default function useFetchLatestBlock(blockNumber?: number | string) {
  return useQuery(
    ['alchemy-latestblock', blockNumber],
    () => alchemy.core.getBlockWithTransactions(blockNumber as string | number),
    {
      refetchInterval: 1000 * 60 * 10,
      enabled: !!blockNumber
    }
  )
}
