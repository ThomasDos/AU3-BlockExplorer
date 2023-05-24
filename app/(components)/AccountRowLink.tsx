import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const StyledAccount = styled.h3`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`
interface AccountRowLinkProps {
  address: string
  text: string
  onClick?: () => void
}

export default function AccountRowLink({ address, onClick, text }: AccountRowLinkProps) {
  const router = useRouter()

  return (
    <StyledAccount
      onClick={() => {
        onClick?.()
        router.push(`/account?address=${address}`)
      }}
    >
      <strong>{text} </strong>
      {address}
    </StyledAccount>
  )
}
