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
  getStateValues,
  singleCategoriesThunk,
} from '@/features/products/categoriesSlice'

const Single = ({ params }) => {
  const { Title } = Typography
  const path = usePathname()
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state)
  const {
    isLoading,
    singlePageError,
    createdAt,
    updatedAt,
    images,
    name,
    edit,
    editLoading,
  } = categories

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  useEffect(() => {
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
        <h1>{name}</h1>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default Single
