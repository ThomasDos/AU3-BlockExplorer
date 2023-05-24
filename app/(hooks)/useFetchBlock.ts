import { alchemy } from '@/app/(utils)/web3/alchemy-client'
import { useMutation } from '@tanstack/react-query'

export default function useFetchBlock() {
  return useMutation(['alchemy-fetch-block'], (blockNumber?: number | string) =>
    alchemy.core.getBlockWithTransactions(blockNumber as number | string)
  )
}
