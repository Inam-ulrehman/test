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
  const { currentPage, isLoading, result } = useSelector(
    (state) => state.categories
  )
  const handleFinish = async (values) => {
    // already registered
    if (result) {
      console.log('already registered')
      const response = await dispatch(updateCategoriesThunk(result))
      console.log(response)
      if (response.payload.success === false) {
        return message.error(response.payload.msg)
      }
    }

    const response = await dispatch(createCategoriesThunk(values))
    // error handling
    if (response.payload.success === false) {
      return message.error(response.payload.msg)
    }
    dispatch(getStateValues({ name: 'currentPage', value: currentPage + 1 }))
  }
  return (
    <Wrapper>
      <Form
        style={{ maxWidth: 400 }}
        onFinish={handleFinish}
        initialValues={{ name: result?.name }}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Please input your Category !' }]}
          label='Category Name'
        >
          <Input maxLength={20} showCount />
        </Form.Item>
        <Form.Item className='button'>
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
