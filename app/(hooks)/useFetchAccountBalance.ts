import { alchemy } from '@/app/(utils)/web3/alchemy-client'
import { useMutation } from '@tanstack/react-query'
import { HexString } from 'ethers/lib.commonjs/utils/data'

export default function useFetchAccountBalance() {
  return useMutation(['alchemy-fetch-account-balance'], (address: HexString) => alchemy.core.getBalance(address))
}
