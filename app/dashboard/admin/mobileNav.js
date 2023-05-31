import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const MobileNav = () => {
  return (
    <Wrapper>
      <Link href={'/dashboard/admin'}>
        <Button type='text'>Dashboard</Button>
      </Link>
      <Link href={'/dashboard/admin/profile'}>
        <Button type='text'>Profile</Button>
      </Link>
      <Link href={'/dashboard/admin/contacts'}>
        <Button type='text'>Contacts</Button>
      </Link>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding-top: 8px;
`
export default MobileNav
