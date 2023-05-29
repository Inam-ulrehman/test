'use client'
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Typography,
} from 'antd'
import styled from 'styled-components'
import { removeUndefinedValues } from './function'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  usersGetProfileThunk,
  usersUpdateProfileThunk,
} from '@/features/users/usersSlice'
import ApiLoading from '@/app/components/singlecomponents/apiLoading'

const Profile = () => {
  const { users } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { Title } = Typography

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onFinish = (values) => {
    const user = removeUndefinedValues(values)
    dispatch(usersUpdateProfileThunk(user))
  }
  useEffect(() => {
    dispatch(usersGetProfileThunk())
  }, [])

  if (users.isLoading) {
    return <ApiLoading />
  }
  return (
    <Wrapper>
      <Title style={{ textAlign: 'center' }}>Update profile</Title>
      <Form
        name='basic'
        style={{
          maxWidth: 600,
        }}
        initialValues={{ ...users, dob: moment(users.dob) }}
        // initialValues={{
        //   remember: true,
        //   name: 'hello',
        //   dob: moment('2023-05-29T04:00:00.000Z'),
        // }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div className='form-grid box'>
          <div className='box-1'>
            {/* first name */}
            <Form.Item
              label='First Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* last name */}
            <Form.Item label='Last Name' name='lastName'>
              <Input />
            </Form.Item>
            {/* gender */}
            <Form.Item label='Gender' name='gender'>
              <Select
                // style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </Form.Item>
            {/* date of birth */}
            <Form.Item label='Date of birth' name='dob'>
              <DatePicker format='YYYY-MM-DD' />
            </Form.Item>
            {/* mobile */}
            <Form.Item label='Mobile' name='mobile'>
              <Input type='number' />
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
              <Input type='email' />
            </Form.Item>
          </div>
          <div className='box-2'>
            {/* apartment */}
            <Form.Item label='Apartment #' name='apartment'>
              <Input />
            </Form.Item>
            {/* house */}
            <Form.Item label='House #' name='house'>
              <Input />
            </Form.Item>
            {/* street */}
            <Form.Item label='Street ' name='street'>
              <Input />
            </Form.Item>
            {/* city */}
            <Form.Item label='City' name='city'>
              <Input />
            </Form.Item>
            {/* province */}
            <Form.Item label='Province' name='province'>
              <Input />
            </Form.Item>
            {/* country */}
            <Form.Item label='Country' name='country'>
              <Input />
            </Form.Item>
            {/* postalCode */}
            <Form.Item label='Postal Code' name='postalCode'>
              <Input />
            </Form.Item>
          </div>
        </div>

        <Form.Item className='button'>
          <Button
            type='primary'
            htmlType='submit'
            loading={users.updateLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .ant-form {
    margin: 0 auto;
    padding: 1rem;
  }
  label {
    width: 90px;
  }
  padding-top: 1rem;
  .button {
    button {
      display: block;
      width: 100%;
    }
  }
  @media (min-width: 992px) {
    .ant-form {
      min-width: 800px;
      border: 2px solid var(--gray-5);
      border-radius: 1rem;
      margin: 1rem auto;
    }
    .box {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }
  }
`
export default Profile
