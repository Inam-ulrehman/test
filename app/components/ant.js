'use client'
import useTheme from '@/hooks/useTheme'
import { blue } from '@ant-design/colors'
import { Button } from 'antd'
import styled from 'styled-components'

const Ant = () => {
  const [theme, toggleTheme] = useTheme()

  const handleChange = () => {
    toggleTheme()
    console.log('hello')
  }
  return (
    <Wrapper>
      {theme}
      <Button onClick={handleChange}>change theme</Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .ant-btn {
  }
  padding: 1rem;
`
export default Ant
