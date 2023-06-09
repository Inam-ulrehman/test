import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, App } from 'antd'
import { updateCategoriesThunk } from '@/features/products/subcategoriesSlice'
import { getStateValues } from '@/features/samples/samplesSlice'
import styled from 'styled-components'
const FormComponent = () => {
  const dispatch = useDispatch()
  const { message } = App.useApp()
  const { name, _id, editLoading } = useSelector((state) => state.subcategories)

  const onFinish = (value) => {
    const subcategories = { ...value, _id }
    dispatch(updateCategoriesThunk({ subcategories, message }))
    dispatch(getStateValues({ name: 'name', value: value.name }))
  }
  return (
    <Wrapper>
      <Form onFinish={onFinish} initialValues={{ name }}>
        <div className='form-layout'>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input maxLength={30} showCount name='name' id='name' />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            style={{ minWidth: '100px' }}
            loading={editLoading}
            type='primary'
            htmlType='submit'
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .form-layout {
    padding: 1rem;
    background-color: var(--gray-3);
    margin: 1rem 0;
    border-radius: 0.5rem;
    max-width: 400px;
  }
`
export default FormComponent
