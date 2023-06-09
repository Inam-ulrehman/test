'use client'
import {
  clearState,
  getStateValues,
} from '@/features/products/subcategoriesSlice'
import { App, Button, Steps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import FormComponent from './form'
import UploadImage from './uploadImage'

const steps = [
  {
    title: 'First',
    description: 'Complete form',
    content: <FormComponent />,
  },
  {
    title: 'Second',
    description: 'Upload image',
    content: <UploadImage />,
  },
]
const StepsComponent = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()
  const { subcategories } = useSelector((state) => state)
  const { currentPage, isLoading, editLoading } = subcategories

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }))

  const prev = () => {
    dispatch(getStateValues({ name: 'currentPage', value: currentPage - 1 }))
  }
  const handleDone = () => {
    message.success('Processing complete')
    dispatch(clearState())
  }
  return (
    <Wrapper>
      <Steps current={currentPage} items={items} />
      <div className='components'>{steps[currentPage].content}</div>
      {/* buttons  */}

      <div className='steps-action'>
        {currentPage === steps.length - 1 && (
          <Button loading={editLoading} type='primary' onClick={handleDone}>
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
  .steps-action {
    margin-top: 24px;
  }
`
export default StepsComponent
