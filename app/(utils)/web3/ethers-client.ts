import { ethers } from 'ethers'

const network = 'mainnet'

const ethersProvider = new ethers.EtherscanProvider(network, process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY)

export default ethersProvider
