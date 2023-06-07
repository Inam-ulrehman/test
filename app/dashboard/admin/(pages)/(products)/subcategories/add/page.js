'use client'
import { getStateValues } from '@/features/products/categoriesSlice'
import { App, Button, Steps, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
const steps = [
  {
    title: 'First',
    description: 'Complete form',
    content: 'First-content',
  },
  {
    title: 'Second',
    description: 'Upload image',
    content: 'Second-content',
  },
]
const Page = () => {
  const { message } = App.useApp()
  const { token } = theme.useToken()
  const dispatch = useDispatch()
  const { currentPage } = useSelector((state) => state.categories)

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }))
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  }
  const next = () => {
    dispatch(getStateValues({ name: 'currentPage', value: currentPage + 1 }))
  }
  const prev = () => {
    dispatch(getStateValues({ name: 'currentPage', value: currentPage - 1 }))
  }
  const handleDone = () => {
    message.success('Processing complete!')
    dispatch(getStateValues({ name: 'currentPage', value: 1 }))
  }
  return (
    <Wrapper>
      <Steps current={currentPage} items={items} />
      <div style={contentStyle}>{steps[currentPage].content}</div>
      {/* buttons  */}

      <div
        style={{
          marginTop: 24,
        }}
      >
        {currentPage < steps.length - 1 && (
          <Button type='primary' onClick={() => next()}>
            Next
          </Button>
        )}
        {currentPage === steps.length - 1 && (
          <Button type='primary' onClick={handleDone}>
            Done
          </Button>
        )}
        {currentPage > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 24px;
`
export default Page
