import { Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ErrorPage = () => {
  const { Title, Text } = Typography

  const { singlePageError } = useSelector((state) => state.contacts)
  return (
    <Wrapper>
      <Title>Error 404!</Title>
      <Text>{singlePageError?.msg}</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  min-height: calc(100vh - 50px);
`
export default ErrorPage
