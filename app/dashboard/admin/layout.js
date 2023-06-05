'use client'

import styled from 'styled-components'

import DesktopNav from './desktopNav'

export default function DashboardLayout({ children }) {
  return (
    <Wrapper>
      <div className='desktop-nav'>
        <DesktopNav />
      </div>
      <div className='children'>{children}</div>
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
    .children {
      min-height: calc(100vh - 50px);
      padding-top: 0.5rem;
    }
    .desktop-nav {
      display: none;
    }
  }

  /* desktop */
  @media (min-width: 920px) {
    display: grid;
    grid-template-columns: 200px auto;
  }
`
