import Cookies from 'js-cookie'
import React, { useState } from 'react'
import styled from 'styled-components'

import { customFetch } from '@/lib/axios/customFetch'
import { App, Button, Form, Input, Typography } from 'antd'
import { LockOutlined } from '@ant-design/icons'
const { Title } = Typography
const ChangePassword = () => {
  const { notification } = App.useApp()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    const cookies = Cookies.get('Authorization_Token')
    try {
      setLoading(true)
      const response = await customFetch.patch(
        '/auth/user/updatepassword',
        values,
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        }
      )
      const { msg } = response.data
      setLoading(false)
      notification.success({
        message: msg,
      })
    } catch (error) {
      setLoading(false)
      console.log(error)
      notification.error({
        message: 'Error Updating password!',
        description: error.response?.data?.msg,
      })
    }
  }
  return (
    <Wrapper>
      <hr />
      <Title style={{ textAlign: 'center' }}>Update Password</Title>

      <Form
        name='normal_login'
        className='login-form'
        layout='vertical'
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
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .ant-form {
    max-width: 600px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
  }
`
export default ChangePassword
