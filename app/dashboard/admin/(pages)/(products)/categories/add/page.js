'use client'

import { useEffect } from 'react'
import StepsComponent from './steps'
import { useDispatch } from 'react-redux'
import { clearState } from '@/features/products/categoriesSlice'

const Page = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearState())
  }, [])
  return (
    <div>
      <StepsComponent />
    </div>
  )
}

export default Page
