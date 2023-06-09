'use client'

import ApiLoading from '@/app/components/singlecomponents/apiLoading'
import { updateContactThunk } from '@/features/contacts/contactsSlice'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorPage from './errorPage'
import styled from 'styled-components'
import moment from 'moment'
import Link from 'next/link'
import { Button, Input, Typography } from 'antd'
import {
  clearState,
  getStateValues,
  singleCategoriesThunk,
} from '@/features/products/subcategoriesSlice'
import FormComponent from './form'
import ImageComponent from './image'

const Single = ({ params }) => {
  const { Title } = Typography
  const path = usePathname()
  const dispatch = useDispatch()
  const { subcategories } = useSelector((state) => state)
  const {
    isLoading,
    singlePageError,
    createdAt,
    updatedAt,
    images,
    name,
    edit,
    editLoading,
  } = subcategories

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  useEffect(() => {
    dispatch(clearState())
    dispatch(singleCategoriesThunk(params))
    dispatch(getStateValues({ name: 'edit', value: true }))
  }, [path])
  if (isLoading) {
    return <ApiLoading />
  }
  if (singlePageError) {
    return <ErrorPage />
  }

  return (
    <Wrapper edit={edit}>
      {/* header */}
      <div className='header'>
        <div className='time'>
          <div className='createdAt'>
            Created At : <span>{moment(createdAt).format('LLL')}</span>
          </div>
          <div className='updatedAt'>
            Updated At : <span>{moment(updatedAt).format('LLL')}</span>
          </div>
        </div>
      </div>
      {/* image */}
      <ImageComponent />
      {/* form */}
      <FormComponent />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .time {
    display: flex;
    flex-wrap: wrap;
    .createdAt,
    .updatedAt {
      border: 1px solid var(--gray-5);
      padding: 5px;
      border-top: transparent;
    }
    .createdAt {
      margin-right: 10px;
      border-left: transparent;
    }
    span {
      font-weight: 500;
    }
  }
`
export default Single
