'use client'
import { customFetch } from '@/lib/axios/customFetch'
import { UserOutlined } from '@ant-design/icons'

import { App, Button, Form, Input, Typography } from 'antd'
import Link from 'next/link'

import { useState } from 'react'
import styled from 'styled-components'
const { Title, Paragraph } = Typography
const Login = () => {
  const [loading, setLoading] = useState(false)
  const { notification } = App.useApp()
  const onFinish = async (values) => {
    try {
      setLoading(true)
      const response = await customFetch.post('user/recover', values)
      notification.success({
        message: 'Success',
        description: response.data.msg,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      notification.error({
        message: 'Error',
        description: error.response?.data?.msg,
      })
    }
  }
  return (
    <Wrapper>
      <Title>Recover Password</Title>

      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Paragraph className='recover-text' strong>
          Enter your recovery email
        </Paragraph>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='User Email'
            type='email'
            size='large'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={loading}
          >
            Submit
          </Button>
          Or <Link href='/login'>Login now!</Link>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-content: center;
  h1 {
    margin: 0 auto;
  }
  /* #components-form-demo-normal-login */
  .login-form {
    max-width: 370px;
    border: 1px solid var(--gray-5);
    border-radius: 5px;

    padding: 1rem;
  }
  /* #components-form-demo-normal-login */
  .login-form-forgot {
    float: right;
  }
  /* #components-form-demo-normal-login */
  .ant-col-rtl .login-form-forgot {
    float: left;
  }
  /* #components-form-demo-normal-login */
  .login-form-button {
    width: 100%;
  }
  /* mobile */
  @media (max-width: 768px) {
    .ant-form {
      min-width: 90vw;
    }
  }
  /* ipad  */
  @media (min-width: 768px) {
    .ant-form {
      min-width: 60vw;
    }
  }
  /*  laptop */
  @media (min-width: 992px) {
    .ant-form {
      min-width: 40vw;
    }
  }
`
export default Login
