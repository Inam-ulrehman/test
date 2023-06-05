import { Button, Menu } from 'antd'
import { UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'

const DesktopNav = () => {
  const [current, setCurrent] = useState('dashboard')

  const handleMenuClick = (key) => {
    setCurrent(key)
  }

  const items = [
    {
      label: 'Products',
      key: 'products',
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={'/dashboard/admin/products'}>Products</Link>,
          key: 'product',
          icon: <LoginOutlined />,
        },
        {
          label: <Link href={'/dashboard/admin/categories'}>Categories</Link>,
          key: 'categories',
          icon: <LoginOutlined />,
        },
        {
          label: (
            <Link href={'/dashboard/admin/subcategories'}>Sub Categories</Link>
          ),
          key: 'subcategories',
          icon: <LoginOutlined />,
        },
      ],
    },
  ]
  const onClick = (e) => {
    // console.log('click ', e)
  }

  return (
    <Wrapper>
      <Link href='/dashboard/admin'>
        <Button type='text' block>
          Dashboard
        </Button>
      </Link>
      <Menu onClick={onClick} mode='inline' items={items} />
      <Link href='/dashboard/admin/products'>
        <Button type='text' block>
          Products
        </Button>
      </Link>
      <Link href='/dashboard/admin/orders'>
        <Button type='text' block>
          Orders
        </Button>
      </Link>
      <Link href='/dashboard/admin/contacts'>
        <Button type='text' block>
          Contacts
        </Button>
      </Link>
      <Link href='/dashboard/admin/profile'>
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
