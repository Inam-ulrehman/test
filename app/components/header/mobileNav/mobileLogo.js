import React from 'react'
import { FaAirbnb } from 'react-icons/fa'
import styled from 'styled-components'
const MobileLogo = () => {
  return (
    <Wrapper>
      <FaAirbnb size={30} />
      <span>Airbnb</span>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;

  path {
    color: blue;
  }
  span {
    font-size: x-large;
    font-weight: 600;
    letter-spacing: 2px;

    padding-left: 1rem;
  }
`
export default MobileLogo
