'use client'
import { Button } from 'antd'
import styled from 'styled-components'
import MobileNavbarDrawer from './drawer'
import MobileLogo from './mobileLogo'

const MobileNav = () => {
  return (
    <Wrapper>
      <div className='container'>
        <span className='logo'>
          <MobileLogo />
        </span>
        <MobileNavbarDrawer />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: 4rem;
  width: 100%;
  .container {
    background-color: white;
    min-height: 4rem;
    width: 100%;

    position: fixed;
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--gray-5);
    padding: 1rem 0;

    .logo {
      display: grid;
      place-content: center;
    }
  }

  /* mobile ipad  */
  @media (max-width: 992px) {
  }

  /* computer only */
  @media (min-width: 992px) {
    display: none;
  }
`
export default MobileNav