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
        <Button type='text' block icon={<LoginOutlined />}>
          Dashboard
        </Button>
      </Link>
      <Menu onClick={onClick} mode='inline' items={items} />
      <Link href='/dashboard/admin/products'>
        <Button type='text' block icon={<LoginOutlined />}>
          Products
        </Button>
      </Link>
      <Link href='/dashboard/admin/orders'>
        <Button type='text' block icon={<LoginOutlined />}>
          Orders
        </Button>
      </Link>
      <Link href='/dashboard/admin/contacts'>
        <Button type='text' block icon={<LoginOutlined />}>
          Contacts
        </Button>
      </Link>
      <Link href='/dashboard/admin/profile'>
        <Button type='text' block icon={<LoginOutlined />}>
          Profile
        </Button>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: sticky;
  top: 8.5%;
  .menuitem {
    background-color: pink;
    padding: 0px !important;
  }

  button {
    display: flex;
    align-items: center;
    padding: 26px !important;
  }
`

export default DesktopNav
