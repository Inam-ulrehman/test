'use client'

import ApiLoading from '@/app/components/singlecomponents/apiLoading'
import { singleContactThunk } from '@/features/contacts/contactsSlice'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorPage from './errorPage'

const Single = ({ params }) => {
  const path = usePathname()
  const dispatch = useDispatch()
  const { isLoading, singlePageError } = useSelector((state) => state.contacts)

  useEffect(() => {
    dispatch(singleContactThunk(params))
  }, [path])
  if (isLoading) {
    return <ApiLoading />
  }
  if (singlePageError) {
    return <ErrorPage />
  }

  return <div>Single</div>
}

export default Single
