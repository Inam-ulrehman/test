import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const DesktopNav = () => {
  return (
    <Wrapper>
      <Link href={'/dashboard/admin'}>
        <Button type='text' block>
          Dashboard
        </Button>
      </Link>
      <Link href={'/dashboard/admin/products'}>
        <Button type='text' block>
          Products
        </Button>
      </Link>
      <Link href={'/dashboard/admin/orders'}>
        <Button type='text' block>
          Orders
        </Button>
      </Link>
      <Link href={'/dashboard/admin/contacts'}>
        <Button type='text' block>
          Contacts
        </Button>
      </Link>
      <Link href={'/dashboard/admin/profile'}>
        <Button type='text' block>
          Profile
        </Button>
      </Link>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: sticky;
  top: 8.5%;
  button {
    text-align: start;
  }
`
export default DesktopNav
