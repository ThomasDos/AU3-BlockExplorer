import { useQuery } from '@tanstack/react-query'
import ethersProvider from '../(utils)/web3/ethers-client'

export default function useFetchEthereumPrice() {
  return useQuery(['ethereumPrice'], () => ethersProvider.getEtherPrice())
}
