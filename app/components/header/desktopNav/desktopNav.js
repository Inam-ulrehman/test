'use client'

import styled from 'styled-components'
import { Menu } from 'antd'
import { useState } from 'react'
import Link from 'next/link'
import DesktopLogo from './desktopLogo'
import { UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import SocialIcons from './desktopSocialIcons'
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
const DesktopNav = () => {
  const [current, setCurrent] = useState('mail')
  const onClick = (e) => {
    // console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <Wrapper>
      <div className='container'>
        <div className='logo-menu'>
          <DesktopLogo />
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode='horizontal'
            items={items}
          />
        </div>
        <SocialIcons />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: 2.9rem;
  width: 100%;

  .container {
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: var(--white);
    border-bottom: 1px solid var(--gray-5);
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    .logo-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ant-menu {
        min-width: 420px;
      }
    }
  }
  /* mobile ipad only */
  @media (max-width: 992px) {
    display: none;
  }

  /* computer only */
  @media (min-width: 992px) {
  }
`
export default DesktopNav
