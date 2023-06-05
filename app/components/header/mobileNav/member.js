import { useEffect, useState, useRef } from 'react'
import { getStateValues } from '@/features/users/usersSlice'
import {
  DashboardOutlined,
  LoginOutlined,
  MailOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Member = ({ setOpen }) => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state)
  const { isMember, isAdmin } = users

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
          label: <Link href={'/dashboard/admin'}>Dashboard</Link>,
          key: 'dashboard',
          icon: <DashboardOutlined />,
        },

        isAdmin && {
          label: <Link href={'dashboard/admin/products'}>Products</Link>,
          key: 'products',
          icon: <ShopOutlined />,
          children: [
            {
              label: <Link href={'/dashboard/admin/products'}>Products</Link>,
              key: 'product',
            },
            {
              label: (
                <Link href={'/dashboard/admin/categories'}>Categories</Link>
              ),
              key: 'categories',
            },
            {
              label: (
                <Link href={'/dashboard/admin/subcategories'}>
                  Sub Categories
                </Link>
              ),
              key: 'subcategories',
            },
          ],
        },
        isAdmin && {
          label: <Link href={'dashboard/admin/orders'}>Orders</Link>,
          key: 'orders',
          icon: <ShoppingOutlined />,
        },
        isAdmin && {
          label: <Link href={'dashboard/admin/contacts'}>Contacts</Link>,
          key: 'contacts',
          icon: <MailOutlined />,
        },
        {
          label: <Link href={'dashboard/admin/profile'}>Profile</Link>,
          key: 'profile',
          icon: <UserAddOutlined />,
        },
        {
          label: <Link href={'/'}>LogOut</Link>,
          key: 'logout',
          icon: <LoginOutlined />,
        },
        !isAdmin && {
          label: <Link href={'dashboard/admin/product'}>Not Member</Link>,
          key: 'product',
          icon: <UserAddOutlined />,
        },
      ].filter(Boolean),
    },
  ]

  const [current, setCurrent] = useState('')
  const [openKeys, setOpenKeys] = useState([])
  const router = useRouter()

  const menuRef = useRef(null)

  const onClick = (e) => {
    if (e.key === 'logout') {
      Cookies.remove('Authorization_Token')
      Cookies.remove('isAdmin')
      router.refresh()
      dispatch(getStateValues({ name: 'isMember', value: false }))
    }
    setCurrent(e.key)
    closeMenu()
    setOpen(false)
  }

  const closeMenu = () => {
    setOpenKeys([])
  }

  const handleOpenChange = (keys) => {
    setOpenKeys(keys)
  }

  useEffect(() => {
    closeMenu() // Close the menu on initial render
  }, [])

  return (
    <Wrapper>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='inline'
        items={isMember ? logOut : login}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        ref={menuRef}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-width: 115px;
  background-color: pink;
`

export default Member
