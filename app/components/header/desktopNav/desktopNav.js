'use client'

import styled from 'styled-components'
import { Menu } from 'antd'
import { useState } from 'react'
import Link from 'next/link'
import DesktopLogo from './desktopLogo'
import { UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'
const items = [
  {
    label: <Link href={'/'}>Home</Link>,
    key: 'Home',
  },
  {
    label: <Link href={'/about'}>About</Link>,
    label: <Link href={'/samples'}>Samples</Link>,
    key: 'SubMenu',
  },
  {
    label: <Link href={'/about'}>About</Link>,
    key: 'About',
  },
  {
    label: <Link href={'/contact'}>Contact</Link>,
    key: 'Contact',
  },
  {
    label: 'Member',
    key: 'Login',
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
const DesktopNav = () => {
  const [current, setCurrent] = useState('mail')
  const onClick = (e) => {
    // console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <Wrapper>
      <DesktopLogo />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  /* mobile ipad only */
  /* border-bottom: 2px solid black; */
  border-bottom: 1px solid var(--gray-5);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .ant-menu {
    min-width: 420px;
  }

  @media (max-width: 992px) {
    display: none;
  }

  /* computer only */
  @media (min-width: 992px) {
  }
`
export default DesktopNav
