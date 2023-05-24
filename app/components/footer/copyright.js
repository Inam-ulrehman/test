'use client'

import { FaRegCopyright } from 'react-icons/fa'
import styled from 'styled-components'
const CopyRight = () => {
  return (
    <Wrapper>
      <span>
        Copyright <FaRegCopyright />
        {new Date().getFullYear()} Inam web solutions. All Rights Reserved.
      </span>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  overflow: hidden;
  text-align: center;
  padding: 1rem;
  bottom: 0;
  height: fit-content;
  border-top: 2px solid var(--gray-5);
  span {
    svg {
      margin-right: 5px;
      margin-bottom: -2px;
    }
  }
`
export default CopyRight
