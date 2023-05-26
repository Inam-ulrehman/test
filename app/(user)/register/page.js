'use client'
import { customFetch } from '@/lib/axios/customFetch'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { App, Button, Checkbox, Form, Input, Typography } from 'antd'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'
const { Title } = Typography

const Register = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { notification } = App.useApp()

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const response = await customFetch.post('/user/register', values)
      const { msg, result, token } = response.data

      Cookies.set('Authorization_Token', token, { expires: 7 })
      notification.success({
        message: msg,
      })
      router.refresh()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error.response.data.msg.startsWith('Duplicate')) {
        return notification.error({
          message: 'Error Registering!',
          description: 'Email is already register.',
        })
      }
      notification.error({
        message: 'Error Registering!',
        description: error.response?.data?.msg,
      })
    }
  }
  return (
    <Wrapper>
      <Title>Registration</Title>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Name'
            size='large'
          />
        </Form.Item>
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
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
            type='email'
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            { min: 8, message: 'Minimum 8 Characters.' },
            {
              pattern: new RegExp('^(?=.*[a-z])'),
              message: 'Lowercase Letter!',
            },
            {
              pattern: new RegExp('^(?=.*[A-Z])'),
              message: 'Uppercase Letter!',
            },
            {
              pattern: new RegExp('^(?=.*\\d)'),
              message: 'Number!',
            },
            {
              pattern: new RegExp('^(?=.*[!@#$%^&*()_+])'),
              message: 'Special Character!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                )
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Confirm Password'
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
            loading={loading}
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Register
          </Button>
          Or <Link href='/login'>login now!</Link>
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
export default Register
