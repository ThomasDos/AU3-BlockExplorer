import { BigNumber } from 'alchemy-sdk'

export default function convertWeiToEth(number: BigNumber) {
  return Number(number) / 10 ** 18
}
