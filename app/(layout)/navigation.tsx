'use client'
import Link from 'next/link'
import { styled } from 'styled-components'

const StyledNavigation = styled.nav`
  border-bottom: #e2e8f0 1px solid;
  padding: 16px;
`

export default function Navigation() {
  return (
    <StyledNavigation>
      <ul className='flex'>
        <li className='mr-6'>
          <Link className='text-blue-500 hover:text-blue-800' href='/'>
            Home
          </Link>
        </li>
        <li className='mr-6'>
          <Link className='text-blue-500 hover:text-blue-800' href='/block'>
            Block
          </Link>
        </li>
        <li className='mr-6'>
          <Link className='text-blue-500 hover:text-blue-800' href='/address'>
            Address
          </Link>
        </li>
        <li className='mr-6'>
          <Link className='text-blue-500 hover:text-blue-800' href='/transaction'>
            Transaction
          </Link>
        </li>
      </ul>
    </StyledNavigation>
  )
}
