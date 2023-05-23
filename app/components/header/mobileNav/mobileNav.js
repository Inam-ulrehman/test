'use client'
import styled from 'styled-components'

const MobileNav = () => {
  return <Wrapper>Mobile Navbar</Wrapper>
}

const Wrapper = styled.nav`
  /* mobile ipad  */
  @media (max-width: 992px) {
  }

  /* computer only */
  @media (min-width: 992px) {
    display: none;
  }
`
export default MobileNav
