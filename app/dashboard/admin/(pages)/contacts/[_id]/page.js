'use client'

import ApiLoading from '@/app/components/singlecomponents/apiLoading'
import { singleContactThunk } from '@/features/contacts/contactsSlice'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorPage from './errorPage'
import styled from 'styled-components'
import moment from 'moment'
import Link from 'next/link'
import { Button } from 'antd'

const Single = ({ params }) => {
  const path = usePathname()
  const dispatch = useDispatch()
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
  } = useSelector((state) => state.contacts)

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
    <Wrapper>
      <div className='header'>
        <div className='box time'>
          <div className='box-1'>
            <span>Created At :</span>
            <strong>{moment(createdAt).format('LLL')}</strong>
          </div>
          <div className='box-2'>
            <span> Updated At :</span>
            <strong>{moment(updatedAt).format('LLL')}</strong>
          </div>
        </div>
        <div className='box contact'>
          <div className='box-1'>
            <span>Email :</span> <strong>{email}</strong>
          </div>
          <div className='box-2'>
            <span>Mobile :</span>
            <strong>{mobile}</strong>
          </div>
        </div>
        <div className='box details'>
          <div className='box-1'>
            <span>Name :</span>
            <strong>{name}</strong>
          </div>
          <div className='box-2'>
            <span>Subject :</span>
            <strong>{subject}</strong>
          </div>
        </div>
      </div>

      <div className='message'>{message}</div>
      <div className='button-box'>
        <Link href={'/dashboard/admin/contacts'}>
          <Button>Go Back</Button>
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .message {
    background-color: var(--gray-3);
    min-height: 50vh;
    margin: 2rem;
    padding: 1rem;
    box-shadow: var(--shadow-3);
    border-radius: var(--radius-2);
  }
  .button-box {
    text-align: center;
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
    .message {
      margin: 1rem;
    }
  }
  @media (min-width: 678px) {
    .header {
      display: flex;
    }
    .box {
      padding: 1rem;
      margin-right: 1rem;
      box-shadow: var(--shadow-2);
    }
  }
`
export default Single
