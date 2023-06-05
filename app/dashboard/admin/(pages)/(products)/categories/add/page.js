'use client'
import Description from './description'
import UploadImage from './uploadImage'

const Page = () => {
  const handleDescription = () => {
    console.log('handleDescription')
  }
  return (
    <div>
      <Description handleDescription={handleDescription} />
      <UploadImage />
    </div>
  )
}

export default Page
