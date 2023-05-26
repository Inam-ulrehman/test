'use client'

import styled from 'styled-components'
import MobileNav from './mobileNav'
import DesktopNav from './desktopNav'

export default function DashboardLayout({ children }) {
  return (
    <Wrapper>
      <div className='desktop-nav'>
        <DesktopNav />
      </div>
      <div className='mobile-nav'>
        <MobileNav />
      </div>

      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* mobile ipad */

  .desktop-nav {
    min-height: calc(100vh - 50px);
    border-right: 1px solid var(--gray-5);
  }
  .mobile-nav {
    background-color: pink;
    min-height: 2.2rem;
  }
  @media (max-width: 920px) {
    .desktop-nav {
      display: none;
    }
  }

  /* desktop */
  @media (min-width: 920px) {
    display: grid;
    grid-template-columns: 200px auto;
    .mobile-nav {
      display: none;
    }
  }
`
