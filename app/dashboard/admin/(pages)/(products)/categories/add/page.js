'use client'

import { UploadOutlined } from '@ant-design/icons'
import { App, Button, Upload } from 'antd'
import { useState } from 'react'

const initialState = {
  uploadImages: [],
  isLoading: false,
}
const Page = () => {
  const { message } = App.useApp()
  const [state, setState] = useState(initialState)
  const { isLoading, uploadImages } = state
  const props = {
    name: 'file',
    action: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    method: 'post', // Add method as POST
    multiple: true, // Enable multiple file uploads if needed
    data: {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET,
      folder: 'test',
    },
    headers: {
      'X-Requested-With': null, // Remove the 'X-Requested-With' header to allow the request to Cloudinary
    },
    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log('removed')
      }

      if (info.file.status === 'done') {
        message.success({
          content: 'File Uploaded Successfully',
        })
      } else if (info.file.status === 'error') {
      }
    },
  }

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  )
}

export default Page
