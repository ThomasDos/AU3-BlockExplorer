import { useRouter } from 'next/navigation'

interface AccountRowLinkProps {
  address: string
  text: string
  onClick?: () => void
}

export default function AccountRowLink({ address, onClick, text }: AccountRowLinkProps) {
  const router = useRouter()

  return (
    <h3
      onClick={() => {
        onClick?.()
        router.push(`/account?address=${address}`)
      }}
      className='text-blue-600 hover:text-blue-900 hover:scale-105 cursor-pointer'
    >
      <strong>{text} </strong>
      {address}
    </h3>
  )
}
