import { customFetch } from '@/lib/axios/customFetch'
import { App, Button, Checkbox, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import styled from 'styled-components'

const ContactForm = () => {
  const { notification } = App.useApp()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await customFetch.post('/contact', values)
      notification.success({
        message: response.data.msg,
      })
      form.resetFields()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      notification.error({
        message: 'Something went wrong',
        description: error?.response?.data?.msg,
      })
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <Form form={form} name='basic' onFinish={onFinish} autoComplete='off'>
        {/* name */}
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input maxLength={20} />
        </Form.Item>
        {/* email */}
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input type='email' maxLength={30} />
        </Form.Item>
        {/* mobile */}
        <Form.Item
          label='Mobile'
          name='mobile'
          rules={[
            {
              required: true,
              message: 'Please input your Mobile!',
            },
          ]}
        >
          <Input type='number' maxLength={15} />
        </Form.Item>
        {/* subject */}
        <Form.Item
          label='Subject'
          name='subject'
          rules={[
            {
              required: true,
              message: 'Please input your Subject!',
            },
          ]}
        >
          <Input maxLength={30} showCount />
        </Form.Item>
        {/* email */}
        <Form.Item
          label='Message'
          name='message'
          rules={[
            {
              required: true,
              message: 'Please input your Message!',
            },
          ]}
        >
          <TextArea style={{ height: 120 }} maxLength={1000} showCount />
        </Form.Item>

        <Button loading={loading} block type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;

  .ant-form-item-label {
    width: 80px;
    display: flex !important;
  }
  @media (min-width: 992px) {
    .ant-form {
      border: 1px solid var(--gray-5);
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: var(--shadow-3);
    }
  }
`

export default ContactForm
