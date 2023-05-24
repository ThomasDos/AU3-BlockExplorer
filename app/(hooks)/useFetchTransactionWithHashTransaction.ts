import { useQuery } from '@tanstack/react-query'
import ethersProvider from '../(utils)/web3/ethers-client'

export default function useFetchTransactionWithHashTransaction(hash?: string | null) {
  return useQuery(
    ['alchemy-fetch-transaction-with-hash-transaction', hash],
    () => ethersProvider.getTransaction(hash as string),
    {
      enabled: !!hash
    }
  )
}
