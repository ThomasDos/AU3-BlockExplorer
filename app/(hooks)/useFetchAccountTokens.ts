import { alchemy } from '@/app/(utils)/alchemy-client'
import { useMutation } from '@tanstack/react-query'
import { HexString } from 'ethers/lib.commonjs/utils/data'

export default function useFetchAccountTokens() {
  return useMutation(['alchemy-fetch-account-tokens'], (address: HexString) => alchemy.core.getTokensForOwner(address))
}
