import React from 'react'
import DesktopNav from './desktopNav/desktopNav'
import MobileNav from './mobileNav/mobileNav'
import { cookies } from 'next/headers'

const Header = () => {
  const cookieStore = cookies()
  const isMember = cookieStore.get('Authorization_Token')
  return (
    <header>
      <DesktopNav isMember={isMember} />
      <MobileNav isMember={isMember} />
    </header>
  )
}

export default Header
