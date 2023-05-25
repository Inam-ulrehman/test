'use client'
import { customFetch } from '@/lib/axios/customFetch'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { App, Button, Checkbox, Form, Input, Typography } from 'antd'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'
const { Title } = Typography

const ChangePassword = () => {
  const pathname = usePathname()

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { notification } = App.useApp()

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const response = await customFetch.post(
        '/auth/user/recoverpassword',
        values,
        {
          headers: {
            Authorization: `Bearer ${pathname.split('/recover/')[1]}`,
          },
        }
      )
      const { msg, result, token } = response.data

      Cookies.set('Authorization_Token', token, { expires: 7 })
      notification.success({
        message: msg,
      })
      router.refresh()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

      notification.error({
        message: 'Error Updating password!',
        description: error.response?.data?.msg,
      })
    }
  }
  return (
    <Wrapper>
      <Title>Change Password</Title>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
          <Button
            loading={loading}
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Submit
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
export default ChangePassword
