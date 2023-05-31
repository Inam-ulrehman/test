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
      <Link href={'/dashboard/admin/profile'}>
        <Button type='text' block>
          Profile
        </Button>
      </Link>
      <Link href={'/dashboard/admin/contacts'}>
        <Button type='text' block>
          Contact
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
