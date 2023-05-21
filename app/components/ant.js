'use client'
import { blue } from '@ant-design/colors'
import { Button } from 'antd'
import styled from 'styled-components'

const Ant = () => {
  return (
    <Wrapper>
      <h1>heading 1</h1>
      <h2>heading 2</h2>
      <h3>heading 3</h3>
      <h4>heading 4</h4>
      <h5>heading 5</h5>
      <p>
        how are you Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
        molestiae non excepturi similique, repudiandae ab voluptas sed! Minus,
        ullam. Corrupti, sit. Assumenda nisi impedit perferendis.
      </p>
      <Button>Change theme</Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .ant-btn {
  }
  padding: 1rem;
`
export default Ant
