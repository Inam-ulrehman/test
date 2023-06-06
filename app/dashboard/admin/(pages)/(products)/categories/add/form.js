import { getStateValues } from '@/features/products/categoriesSlice'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const FormComponent = () => {
  const dispatch = useDispatch()
  const handleFinish = (values) => {
    console.log(values)
    dispatch(getStateValues({ name: 'inputComplete', value: true }))
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
        <Form.Item>
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
