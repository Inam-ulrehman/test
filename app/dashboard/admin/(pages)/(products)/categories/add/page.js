'use client'

import { customFetch } from '@/lib/axios/customFetch'
import { UploadOutlined } from '@ant-design/icons'
import { App, Button, Upload } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

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
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png'
      if (!isPNG) {
        message.error(`${file.name} is not a png file`)
      }
      return isPNG || Upload.LIST_IGNORE
    },
    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'removed') {
        try {
          const result = await customFetch.post(
            '/authadmin/product/category/destroyimage',
            { public_id: info.file.response.public_id }
          )
          console.log(result)
        } catch (error) {
          console.log(error)
        }
      }

      if (info.file.status === 'done') {
        message.success({
          content: 'File Uploaded Successfully',
        })
      } else if (info.file.status === 'error') {
        message.error({
          content: 'File Uploaded failed',
        })
      }
    },
  }

  return (
    <Wrapper>
      <Upload
        {...props}
        maxCount={6}
        listType='picture'
        // defaultFileList={[...fileList]}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-inline-end: 8px;
  }

  .ant-upload-rtl.upload-list-inline .ant-upload-list-item {
    float: right;
  }
`
export default Page
