'use client'

import ApiLoading from '@/app/components/singlecomponents/apiLoading'
import {
  getStateValues,
  singleContactThunk,
  updateContactThunk,
} from '@/features/contacts/contactsSlice'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorPage from './errorPage'
import styled from 'styled-components'
import moment from 'moment'
import Link from 'next/link'
import { Button, Input } from 'antd'
import Title from 'antd/es/typography/Title'

const Single = ({ params }) => {
  const path = usePathname()
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)
  const {
    isLoading,
    singlePageError,
    createdAt,
    updatedAt,
    email,
    mobile,
    message,
    subject,
    name,
    edit,
    editLoading,
  } = contacts

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  useEffect(() => {
    dispatch(singleContactThunk(params))
  }, [path])
  if (isLoading) {
    return <ApiLoading />
  }
  if (singlePageError) {
    return <ErrorPage />
  }

  return (
    <Wrapper edit={edit}>
      <div className='header'>
        <div className='box time'>
          <div className='box-1'>
            <span>Created At</span>
            <Input value={moment(createdAt).format('LLL')} disabled={true} />
          </div>
          <div className='box-2'>
            <span> Updated At</span>
            <Input value={moment(updatedAt).format('LLL')} disabled={true} />
          </div>
        </div>
        <div className='box contact'>
          <div className='box-1'>
            <span>Email</span>
            <Input
              onChange={onChange}
              name='email'
              value={email}
              disabled={edit}
            ></Input>
          </div>
          <div className='box-2'>
            <span>Mobile</span>
            <Input
              name='mobile'
              onChange={onChange}
              value={mobile}
              disabled={edit}
            ></Input>
          </div>
        </div>
        <div className='box details'>
          <div className='box-1'>
            <span>Name</span>
            <Input
              name='name'
              onChange={onChange}
              value={name}
              disabled={edit}
            ></Input>
          </div>
          <div className='box-2'>
            <span>Subject</span>
            <Input
              name='subject'
              onChange={onChange}
              value={subject}
              disabled={edit}
            ></Input>
          </div>
        </div>
      </div>

      <div className='message'>
        <Title level={3} style={{ textAlign: 'center' }}>
          Message
        </Title>
        <Input.TextArea disabled={true} showCount value={message} />
      </div>
      <div className='button-box'>
        <Link href={'/dashboard/admin/contacts'}>
          <Button>Go Back</Button>
        </Link>
        {edit ? (
          <Button
            onClick={() =>
              dispatch(getStateValues({ name: 'edit', value: false }))
            }
          >
            Edit
          </Button>
        ) : (
          <Button
            loading={editLoading}
            onClick={() => dispatch(updateContactThunk(contacts))}
          >
            Save
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .button-box {
    text-align: center;
    button {
      margin: 1rem;
    }
  }
  .message {
    padding: 5px;
    .ant-input {
      min-height: 50vh;
    }
  }
  .ant-input {
    color: var(--gray-7) !important;
    color: ${(props) =>
      props.edit === true ? 'var(--gray-8)' : 'black'} !important;
  }

  @media (max-width: 678px) {
    .box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .box-1,
      .box-2 {
        padding: 5px;
      }
    }
  }
  @media (min-width: 678px) {
    .header {
      display: flex;
      justify-content: space-evenly;
    }
    .box {
      padding: 1rem;
      margin-right: 1rem;
      box-shadow: var(--shadow-2);
    }
    .message {
      min-height: 50vh;
    }
  }
`
export default Single
