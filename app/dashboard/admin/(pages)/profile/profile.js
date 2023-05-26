'use client'
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from 'antd'
import styled from 'styled-components'
const onFinish = (values) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const Profile = () => {
  const { Title } = Typography
  return (
    <Wrapper>
      <Title style={{ textAlign: 'center' }}>Update profile</Title>
      <Form
        name='basic'
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
          firstName: 'hello',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        {/* first name */}
        <Form.Item
          label='First Name'
          name='firstName'
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
          <DatePicker />
        </Form.Item>
        {/* mobile */}
        <Form.Item label='Mobile' name='mobile'>
          <Input />
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
          <Input />
        </Form.Item>
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

        <Form.Item>
          <Button type='primary' htmlType='submit'>
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
`
export default Profile
