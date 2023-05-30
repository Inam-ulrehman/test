import { Button, Checkbox, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import styled from 'styled-components'

export default Form = () => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Success:', values)
    form.resetFields()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Wrapper>
      <Form
        form={form}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
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
          <Input type='email' />
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
          <Input type='number' />
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
          <Input />
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
          <TextArea style={{ height: 120, resize: 'none' }} />
        </Form.Item>

        <Button block type='primary' htmlType='submit'>
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
