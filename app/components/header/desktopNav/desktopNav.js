'use client'

import styled from 'styled-components'
import { Menu } from 'antd'
import { useState } from 'react'
import Link from 'next/link'
import DesktopLogo from './desktopLogo'

import SocialIcons from './desktopSocialIcons'
import Member from './member'
import { usePathname, useSearchParams } from 'next/navigation'

const items = [
  {
    label: <Link href={'/'}>Home</Link>,
    key: '/',
  },
  {
    label: <Link href={'/about'}>About</Link>,
    label: <Link href={'/samples'}>Samples</Link>,
    key: '/samples',
  },
  {
    label: <Link href={'/about'}>About</Link>,
    key: '/about',
  },
  {
    label: <Link href={'/contact'}>Contact</Link>,
    key: '/contact',
  },
]
const DesktopNav = () => {
  const path = usePathname()
  const [current, setCurrent] = useState(path)
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
        <Member />
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
    grid-template-columns: 1fr auto auto;
    align-items: center;
    .logo-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ant-menu {
        min-width: 305px;
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
