'use client'
import UploadImage from './uploadImage'
import FormFormComponent from './form'
import { useSelector } from 'react-redux'
import StepsComponent from './steps'

const Page = () => {
  const { inputComplete } = useSelector((state) => state.categories)
  return (
    <div>
      <StepsComponent />
    </div>
  )
}

export default Page
