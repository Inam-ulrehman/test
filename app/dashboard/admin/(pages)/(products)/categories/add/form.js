import { getStateValues } from '@/features/products/categoriesSlice'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const FormComponent = () => {
  const dispatch = useDispatch()
  const { currentPage } = useSelector((state) => state.categories)
  const handleFinish = (values) => {
    console.log(values)

    dispatch(getStateValues({ name: 'currentPage', value: currentPage + 1 }))
  }
  return (
    <Wrapper>
      <Form style={{ maxWidth: 400 }} onFinish={handleFinish}>
        <Form.Item
          name='category'
          rules={[{ required: true, message: 'Please input your Category!' }]}
          label='Category Name'
        >
          <Input maxLength={20} showCount />
        </Form.Item>
        <Form.Item className='button'>
          <Button type='primary' htmlType='submit'>
            Next Step
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default FormComponent
