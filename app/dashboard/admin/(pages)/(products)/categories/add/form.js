import {
  createCategoriesThunk,
  getStateValues,
  updateCategoriesThunk,
} from '@/features/products/categoriesSlice'
import { App, Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const FormComponent = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state)
  const { currentPage, isLoading, editLoading, _id, name } = categories

  const handleSubmit = (value) => {
    if (_id) {
      return dispatch(updateCategoriesThunk({ categories, message }))
    }
    dispatch(createCategoriesThunk({ categories, message }))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  return (
    <Wrapper>
      <Form onFinish={handleSubmit} initialValues={{ name: name }}>
        <div className='form-layout'>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input
              maxLength={30}
              showCount
              name='name'
              id='name'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            loading={isLoading || editLoading}
            type='primary'
            htmlType='submit'
          >
            Next Step
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
  }
`

export default FormComponent
