'use client'

import { customFetch } from '@/lib/axios/customFetch'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { App, Button, Checkbox, Form, Input, Typography } from 'antd'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styled from 'styled-components'
const { Title, Paragraph } = Typography
// login
const Login = () => {
  const { notification } = App.useApp()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const response = await customFetch.post('/user/login', values)
      const { msg, token } = response.data
      Cookies.set('Authorization_Token', token, { expires: 7 })
      notification.success({
        message: msg,
      })
      router.refresh()
      setLoading(false)
    } catch (error) {
      notification.error({
        message: error.response?.data?.msg,
        description: 'Please try different Password!',
      })
      setLoading(false)
    }
  }
  return (
    <Wrapper>
      <Title>Login</Title>

      <Form
        name='login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Paragraph>Login to continue to your account</Paragraph>
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
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
            { min: 8, message: 'Minimum 8 Characters!' },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
            size='large'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className='login-form-forgot' href='/recover'>
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={loading}
          >
            Log in
          </Button>
          Or <Link href='/register'>register now!</Link>
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

    padding: 2rem 4rem;
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
  /* ipad laptop */
  @media (min-width: 768px) {
    .ant-form {
      min-width: 40vw;
    }
  }
`
export default Login
