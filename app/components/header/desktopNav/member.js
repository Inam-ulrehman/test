import { LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'
const items = [
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
const Member = () => {
  const [current, setCurrent] = useState('mail')
  const onClick = (e) => {
    // console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <Wrapper>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-width: 115px;
  background-color: pink;
`
export default Member
