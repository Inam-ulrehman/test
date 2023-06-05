'use client'

import styled from 'styled-components'
import DesktopNav from './desktopNav'

export default function DashboardLayout({ children }) {
  return (
    <Wrapper>
      <div className='desktop-nav'>
        <DesktopNav />
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

  @media (max-width: 920px) {
    .desktop-nav {
      display: none;
    }
  }
`
