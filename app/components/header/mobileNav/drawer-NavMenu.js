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
  // login
  {
    label: 'Member',
    key: 'Member',
    icon: <UserOutlined />,
    children: [
      {
        label: <Link href={'/login'}>Login</Link>,
        key: 'Login',
        icon: <LoginOutlined />,
      },
      {
        label: <Link href={'/register'}>Register</Link>,
        key: 'Register',
        icon: <UserAddOutlined />,
      },
    ],
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
    </Wrapper>
  )
}
const Wrapper = styled.div``
export default NavMenu
