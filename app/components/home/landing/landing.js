'use client'
import { Typography } from 'antd'
import styled from 'styled-components'
const { Title } = Typography
const Landing = () => {
  return (
    <Wrapper>
      <Title>Home page</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 45px);
`
export default Landing
