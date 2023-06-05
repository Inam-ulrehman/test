import { Button, Menu } from 'antd'
import {
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  MailOutlined,
  ShopOutlined,
  ShoppingOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'

const DesktopNav = () => {
  const items = [
    {
      label: 'Products',
      key: 'products',
      icon: <ShopOutlined />,
      children: [
        {
          label: <Link href={'/dashboard/admin/products'}>Products</Link>,
          key: 'product',
        },
        {
          label: <Link href={'/dashboard/admin/categories'}>Categories</Link>,
          key: 'categories',
        },
        {
          label: (
            <Link href={'/dashboard/admin/subcategories'}>Sub Categories</Link>
          ),
          key: 'subcategories',
        },
      ],
    },
  ]

  return (
    <Wrapper>
      <Link href='/dashboard/admin'>
        <Button type='text' block icon={<DashboardOutlined />}>
          Dashboard
        </Button>
      </Link>
      <Menu mode='inline' items={items} />

      <Link href='/dashboard/admin/orders'>
        <Button type='text' block icon={<ShoppingOutlined />}>
          Orders
        </Button>
      </Link>
      <Link href='/dashboard/admin/contacts'>
        <Button type='text' block icon={<MailOutlined />}>
          Contacts
        </Button>
      </Link>
      <Link href='/dashboard/admin/profile'>
        <Button type='text' block icon={<UserOutlined />}>
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
