'use client'
import styled from 'styled-components'
import CopyRight from './copyright'
import QuickLinks from './quicklinks'
import SocialMedia from './socialmedia'
import Address from './address'

const Footer = () => {
  return (
    <Wrapper>
      <div className='footer-container'>
        <QuickLinks />
        <SocialMedia />
        <Address />
      </div>
      <CopyRight />
    </Wrapper>
  )
}
const Wrapper = styled.footer`
  border-top: 2px solid var(--gray-5);
  a {
    color: var(--black);
  }
  .footer-container {
    padding: 1rem;
  }
  @media (min-width: 992px) {
    .footer-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`
export default Footer
