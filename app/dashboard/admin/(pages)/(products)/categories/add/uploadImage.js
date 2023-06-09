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
  isLoading: false,
  totalImages: 0,
  previewOpen: false,
  previewImage: '',
  previewTitle: '',
}
// show image locally
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

// upload image to cloudinary

const UploadImage = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()
  const { _id, images } = useSelector((state) => state.categories)
  const [state, setState] = useState(initialState)

  const handleCancel = () => setState({ ...state, previewOpen: false })

  // preview image
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
  // All images functions here
  const props = {
    name: 'file',
    action: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    method: 'post', // Add method as POST
    // multiple: true, // Enable multiple file uploads if needed

    data: {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET,
      folder: 'test',
    },
    headers: {
      'X-Requested-With': null, // Remove the 'X-Requested-With' header to allow the request to Cloudinary
    },
    defaultFileList: images,
    beforeUpload: (file) => {
      const acceptedImageTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/svg+xml',
      ]
      const isValidImageType = acceptedImageTypes.includes(file.type)
      if (!isValidImageType) {
        message.error(`${file.name} is not a valid image type`)
      }
      return isValidImageType || Upload.LIST_IGNORE
    },
    async onChange(info) {
      setState({ ...state, totalImages: info.fileList.length })
      dispatch(getStateValues({ name: 'editLoading', value: true }))
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (info.file.status === 'removed') {
        const uid = info.file.response.asset_id
        // remove image from redux
        let removeImage = images.filter((image) => image.uid !== uid)
        if (removeImage.length === 0) {
          removeImage = []
        }

        // delete image from cloudinary
        try {
          const result = await customFetch.post(
            '/authadmin/product/category/destroyimage',
            { public_id: info.file.response.public_id }
          )
          // update image in redux
          dispatch(getStateValues({ name: 'images', value: removeImage }))
          // update image in database
          dispatch(
            updateCategoriesThunk({
              categories: { images: removeImage, _id },
              message,
            })
          )
          // cloudinary response
        } catch (error) {
          message.error({
            content: 'Error deleting image from cloudinary',
          })
        }
      }
      //  upload image to cloudinary complete
      if (info.file.status === 'done') {
        // formate of saving image in database
        const filterImages = info.fileList.map((file) => {
          const uid = file.response.asset_id
          const name = file.response.original_filename
          const status = 'done'
          const url = file.response.secure_url
          const response = file.response

          return { uid, name, status, url, response }
        })

        const categories = { images: filterImages, _id }
        // update image in redux
        dispatch(getStateValues({ name: 'images', value: filterImages }))
        // update image in database
        dispatch(updateCategoriesThunk({ categories, message }))

        // error uploading image to cloudinary
      } else if (info.file.status === 'error') {
        message.error({
          content: 'File failed to upload cloudinary',
        })
      }
    },
  }
  // upload button
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
        maxCount={1}
        listType='picture-card'
        onPreview={handlePreview}
      >
        {/* Max limit is 1 */}
        {state.totalImages >= 1 ? null : uploadButton}
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
