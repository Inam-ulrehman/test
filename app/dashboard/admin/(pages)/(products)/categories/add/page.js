'use client'
import UploadImage from './uploadImage'
import FormFormComponent from './form'
import { useSelector } from 'react-redux'

const Page = () => {
  const { inputComplete } = useSelector((state) => state.categories)
  return (
    <div>
      <FormFormComponent />
      {inputComplete && <UploadImage />}
    </div>
  )
}

export default Page
