import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetchCryptos() {
  const CMCKey = process.env.NEXT_PUBLIC_CMC_API_KEY
  return useQuery(
    ['cryptos'],
    async () =>
      await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD',
        {
          headers: {
            'X-CMC_PRO_API_KEY': CMCKey
          }
        }
      )
  )
}
