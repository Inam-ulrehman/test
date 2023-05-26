import Link from 'next/link'
import React, { useState } from 'react'
import {
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  HomeOutlined,
  AppleOutlined,
  SolutionOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import styled from 'styled-components'
import Member from './member'
const items = [
  {
    label: <Link href={'/'}>Home</Link>,
    key: 'Home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link href={'/samples'}>Samples</Link>,
    key: 'Sample',
    icon: <AppleOutlined />,
  },
  {
    label: <Link href={'/about'}>About</Link>,
    key: 'About',
    icon: <SolutionOutlined />,
  },
  {
    label: <Link href={'/contact'}>Contact</Link>,
    key: 'Contact',
    icon: <WhatsAppOutlined />,
  },
]
const NavMenu = ({ setOpen }) => {
  const [current, setCurrent] = useState('mail')
  const onClick = (e) => {
    // console.log('click ', e)
    setOpen(false)
    setCurrent(e.key)
  }
  return (
    <Wrapper>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='inline'
        items={items}
      />
      <Member setOpen={setOpen} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
export default NavMenu
