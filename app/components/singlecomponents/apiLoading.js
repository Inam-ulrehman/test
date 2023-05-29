import { Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

const ApiLoading = () => {
  return (
    <Wrapper className='loading-component'>
      <Spin tip='Loading...'>
        <div className='content' />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
`

export default ApiLoading
