import { LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styled from 'styled-components'

const Member = ({ isMember }) => {
  const login = [
    {
      label: 'Member',
      key: 'Member',
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={'/login'}>Login</Link>,
          key: 'login',
          icon: <LoginOutlined />,
        },
        {
          label: <Link href={'/register'}>Register</Link>,
          key: 'register',
          icon: <UserAddOutlined />,
        },
      ],
    },
  ]
  const logOut = [
    {
      label: 'Member',
      key: 'Member',
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={'/'}>LogOut</Link>,
          key: 'logout',
          icon: <LoginOutlined />,
        },
        {
          label: <Link href={'/dashboard'}>Dashboard</Link>,
          key: 'dashboard',
          icon: <UserAddOutlined />,
        },
      ],
    },
  ]

  const [current, setCurrent] = useState('mail')
  const router = useRouter()
  const onClick = (e) => {
    // console.log('click ', e)
    if (e.key === 'logout') {
      Cookies.remove('Authorization_Token')
      router.refresh()
    }
    setCurrent(e.key)
  }
  return (
    <Wrapper>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={isMember ? logOut : login}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-width: 115px;
  background-color: pink;
`
export default Member
