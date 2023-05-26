'use client'
import styled from 'styled-components'
import DesktopNav from './desktopNav'
import MobileNav from './mobileNav'

const Drawer = () => {
  return (
    <Wrapper>
      <div className='desktop-nav'>
        <DesktopNav />
      </div>
      <div className='mobile-nav'>
        <MobileNav />
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  @media (max-width: 992px) {
    .desktop-nav {
      display: none;
    }
  }
  @media (min-width: 992px) {
    .mobile-nav {
      display: none;
    }
  }
`
export default Drawer
