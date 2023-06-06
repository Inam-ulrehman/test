'use client'
import { customFetch } from '@/lib/axios/customFetch'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '@/lib/localStorage/localStorage'
import { Button, position, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { CldImage } from 'next-cloudinary'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const initialState = {
  uploadImages: [],
  isLoading: false,
}
function CloudinaryWidget() {
  const { refreshData } = useSelector((state) => state.cars)
  const toast = useToast()
  const [state, setState] = useState(initialState)
  const { isLoading, uploadImages } = state

  // handle submit
  const handleUpload = async (event) => {
    event.preventDefault()

    const files = event.target.files
    const formData = new FormData()

    formData.append('file', files[0])
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET)
    formData.append('folder', 'carsell/cars')
    setState({ ...state, isLoading: true })

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )
    const data = await response.json()
    if (data.error) {
      setState({ ...state, isLoading: false })
      toast({
        description: data?.error?.message,
        status: 'error',
        position: 'top-right',
      })

      return
    }

    setState({
      ...state,
      uploadImages: [...state.uploadImages, data],
      isLoading: false,
    })
    setItemInLocalStorage('uploadImage', [...state.uploadImages, data])
  }
  // handle delete
  const handleDelete = async (public_id) => {
    const newImages = uploadImages.filter(
      (item) => item.public_id !== public_id
    )
    setState({
      ...state,
      uploadImages: newImages,
    })
    setItemInLocalStorage('uploadImage', newImages)
    try {
      const response = await customFetch.post(`/auth/image/destroy`, {
        public_id,
      })
    } catch (error) {
      toast({
        description: 'Unable to delete image server error.',
        status: 'error',
        position: 'top-right',
      })
      console.log(error)
    }
  }
  // use effect
  useEffect(() => {
    const storageImages = getItemFromLocalStorage('uploadImage')
    if (!storageImages || null) {
      setState({ ...state, uploadImages: [] })
      return
    }
    setState({ ...state, uploadImages: storageImages })
  }, [refreshData])

  return (
    <Wrapper>
      <Button
        isLoading={isLoading}
        loadingText='Uploading...'
        colorScheme='teal'
        className='file-upload-container'
      >
        <label htmlFor='file-upload' className='btn'>
          Upload
          <input
            type='file'
            id='file-upload'
            className='custom-file-input'
            onChange={handleUpload}
          />
        </label>
      </Button>

      {uploadImages.length > 0 && (
        <div className='container'>
          {uploadImages.map((item, index) => {
            return (
              <motion.div key={index} className='container-holder'>
                <div className='image'>
                  <CldImage
                    width={200}
                    height={200}
                    src={item.public_id}
                    alt='Image'
                  />
                </div>
                <Button
                  onClick={() => handleDelete(item.public_id)}
                  colorScheme='red'
                  size={'xs'}
                >
                  X
                </Button>
              </motion.div>
            )
          })}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .file-upload-container {
    margin-bottom: 1rem;
    max-width: fit-content;
    text-align: center;
    input[type='file'] {
      display: none;
    }
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .container-holder {
    width: fit-content;
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;

    .image {
      background-color: var(--chakra-colors-gray-300);
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`
export default CloudinaryWidget
