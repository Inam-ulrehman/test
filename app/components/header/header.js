import React from 'react'
import DesktopNav from './desktopNav/desktopNav'
import MobileNav from './mobileNav/mobileNav'

const Header = () => {
  return (
    <header>
      <DesktopNav />
      <MobileNav />
    </header>
  )
}

export default Header
