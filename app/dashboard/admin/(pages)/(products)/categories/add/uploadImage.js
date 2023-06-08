'use client'

import {
  getStateValues,
  updateCategoriesThunk,
} from '@/features/products/categoriesSlice'
import { customFetch } from '@/lib/axios/customFetch'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { App, Button, Modal, Upload } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const initialState = {
  uploadImages: [],
  isLoading: false,
  totalImages: 0,
  previewOpen: false,
  previewImage: '',
  previewTitle: '',
}
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
const UploadImage = () => {
  const { message } = App.useApp()
  const { _id, images } = useSelector((state) => state.categories)
  const dispatch = useDispatch()
  const [state, setState] = useState(initialState)
  const [previewTitle, setPreviewTitle] = useState('')
  const handleCancel = () => setState({ ...state, previewOpen: false })
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setState({
      ...state,
      previewOpen: true,
      previewImage: file.url || file.preview,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }
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
    defaultFileList: images,
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png'
      if (!isPNG) {
        message.error(`${file.name} is not a png file`)
      }
      return isPNG || Upload.LIST_IGNORE
    },
    async onChange(info) {
      setState({ ...state, totalImages: info.fileList.length })
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (info.file.status === 'removed') {
        const uid = info.file.response.asset_id
        const removeImage = images.filter((image) => image.uid !== uid)

        try {
          const result = await customFetch.post(
            '/authadmin/product/category/destroyimage',
            { public_id: info.file.response.public_id }
          )
          dispatch(getStateValues({ name: 'images', value: removeImage }))
        } catch (error) {
          console.log(error)
          message.error({
            content: 'Error deleting image from cloudinary',
          })
        }
      }

      if (info.file.status === 'done') {
        const filterImages = info.fileList.map((file) => {
          const uid = file.response.asset_id
          const name = file.response.original_filename
          const status = 'done'
          const url = file.response.secure_url
          const response = {
            secure_url: file.response.secure_url,
            public_id: file.response.public_id,
          }

          return { uid, name, status, url, response }
        })

        const categories = { images: filterImages, _id }
        dispatch(getStateValues({ name: 'images', value: filterImages }))
        dispatch(updateCategoriesThunk({ categories, message }))
      } else if (info.file.status === 'error') {
        message.error({
          content: 'File failed to upload cloudinary',
        })
      }
    },
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )
  return (
    <Wrapper>
      <Upload
        {...props}
        maxCount={6}
        listType='picture-card'
        onPreview={handlePreview}
      >
        {state.totalImages >= 6 ? null : uploadButton}
      </Upload>

      <Modal
        open={state.previewOpen}
        title={state.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt='example'
          style={{
            width: '100%',
          }}
          src={state.previewImage}
        />
      </Modal>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* upload layout */

  padding: 1rem;
  background-color: var(--gray-3);
  margin: 1rem 0;
  border-radius: 0.5rem;

  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-inline-end: 8px;
  }

  .ant-upload-rtl.upload-list-inline .ant-upload-list-item {
    float: right;
  }
`
export default UploadImage
