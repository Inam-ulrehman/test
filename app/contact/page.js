'use client'

import styled from 'styled-components'
import Image from './image'
import ContactForm from './form'

const Contact = () => {
  return (
    <Wrapper>
      <Image />
      <ContactForm />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  max-width: 90vw;
  margin: 0 auto;

  min-height: calc(100vh - 50px);
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`
export default Contact
