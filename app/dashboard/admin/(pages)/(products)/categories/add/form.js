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
  const { currentPage, isLoading, result, name } = categories

  const handleSubmit = (value) => {
    if (result) {
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
        <Form.Item>
          <Button loading={isLoading} type='primary' htmlType='submit'>
            Next Step
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default FormComponent
