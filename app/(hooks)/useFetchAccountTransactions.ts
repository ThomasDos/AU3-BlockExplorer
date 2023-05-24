import { useMutation } from '@tanstack/react-query'
import { BigNumber } from 'alchemy-sdk'
import axios from 'axios'
import { HexString } from 'ethers/lib.commonjs/utils/data'

export interface UseFetchAccountTransactionsResponse {
  status: string
  message: string
  result: TransactionResult[]
}

export interface TransactionResult {
  blockNumber: string
  timeStamp: number
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: BigNumber
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  methodId: string
  functionName: string
}

export default function useFetchAccountTransactions() {
  return useMutation(['alchemy-fetch-account-transactions'], (address: HexString) =>
    axios
      .get<UseFetchAccountTransactionsResponse>('https://api.etherscan.io/api', {
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
