import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { HexString } from 'ethers/lib.commonjs/utils/data'

export default function useFetchAccountTransactions() {
  return useMutation(['alchemy-fetch-account-transactions'], (address: HexString) =>
    axios
      .get('https://api.etherscan.io/api', {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: 0,
          endblock: 99999999,
          page: 1,
          offset: 20,
          sort: 'asc',
          apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
        }
      })
      .then((res) => res.data.result)
  )
}
