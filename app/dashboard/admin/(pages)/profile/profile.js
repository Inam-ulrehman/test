'use client'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import FormInput from '@/app/components/singlecomponents/FormInput'
import Cookies from 'js-cookie'
import GooglePlacesHook from '@/hooks/GooglePlacesHook'
import { customFetch } from '@/lib/axios/customFetch'
import ChangePassword from './ChangePassword'
import { App, Button, DatePicker, Input, Select } from 'antd'
import ApiLoading from '@/app/components/singlecomponents/apiLoading'

const initialState = {
  user: [],
  isLoading: false,
  updateLoading: false,
  name: '',
  lastName: '',
  gender: '',
  dob: '',
  email: '',
  mobile: '',
  location: '',
  apartment: '',
  house: '',
  street: '',
  city: '',
  province: '',
  country: '',
  postalCode: '',
  updatedAt: '',
  createdAt: '',
  verified: '',
}
const Profile = () => {
  const [state, setState] = useState(initialState)
  const { user } = useSelector((state) => state)
  const { notification } = App.useApp()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cookies = Cookies.get('Authorization_Token')
    setState({ ...state, updateLoading: true })
    try {
      const response = await customFetch.patch(
        '/auth/user/updateprofile',
        state,
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        }
      )
      notification.success({
        message: response.data.msg,
      })
      setState({ ...state, updateLoading: false })
    } catch (error) {
      setState({ ...state, updateLoading: false })
      notification.error({
        message: error?.response?.data?.msg,
      })
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
  const handleDatePickerChange = (date, dateString) => {
    const formattedDate = moment(dateString).toISOString()
    setState({ ...state, dob: formattedDate })
  }
  const handleGenderChange = (value) => {
    setState({ ...state, gender: value })
  }

  // Get single User
  const getData = async () => {
    setState({ ...state, isLoading: true })
    const cookies = Cookies.get('Authorization_Token')
    try {
      const response = await customFetch.get('/auth/user/getprofile', {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      })

      const data = response.data.result
      setState({ ...state, ...data, isLoading: false })
    } catch (error) {
      console.log(error)
      setState({ ...state, isLoading: false })
    }
  }

  useEffect(() => {
    getData()

    // eslint-disable-next-line
  }, [])
  // if (state.isLoading) {
  //   return <ApiLoading />
  // }
  return (
    <>
      <Wrapper>
        <div className='dates'>
          <p>
            Member Since :
            <strong> {moment(state.createdAt).format('MMM Do YY')}</strong>
          </p>
          <p>
            Last updated :
            <strong> {moment(state.updatedAt).format('MMM Do YY')}</strong>
          </p>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='profile'>
            {/* name input */}
            <div className='name'>
              <label htmlFor='name'>First Name</label>
              <Input
                size='large'
                name={'name'}
                value={state.name}
                onChange={handleChange}
              ></Input>
            </div>

            {/* last name input */}
            <div className='lastName'>
              <label htmlFor='lastName'>Last Name</label>
              <Input
                size='large'
                name={'lastName'}
                value={state.lastName}
                onChange={handleChange}
              ></Input>
            </div>

            {/* Date of birth input */}
            <div className='dob'>
              <label htmlFor='dob'>Date Of Birth</label>

              <DatePicker
                value={state.dob ? moment(state.dob) : null}
                style={{ display: 'block', maxWidth: '100%' }}
                onChange={handleDatePickerChange}
                size='large'
              />
            </div>
            {/* gender */}
            <div className='gender'>
              <label htmlFor='gender'>Gender</label>
              <Select
                defaultValue={state.gender ? state.gender : 'Select'}
                style={{ display: 'block', maxWidth: '100%' }}
                onChange={handleGenderChange}
                options={[
                  { value: 'Select', label: 'Select' },
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </div>
            {/* Email input */}
            <div className='email'>
              <label htmlFor='email'>Email</label>
              <Input
                type='email'
                size='large'
                name={'email'}
                value={state.email}
                onChange={handleChange}
              ></Input>
            </div>

            {/* mobile input */}
            <div className='mobile'>
              <label htmlFor='mobile'>Mobile</label>
              <Input
                type='number'
                size='large'
                name={'mobile'}
                // state.mobile === null ? '' : state.mobile
                value={state.mobile}
                onChange={handleChange}
              ></Input>
            </div>
          </div>
          {/* ====================Box Divider=============*/}
          <div className='box-2'>
            <GooglePlacesHook state={state} setState={setState} />
            <div className='box-2-inline'>
              {/* apartment  */}
              <div className='apartment'>
                <label htmlFor='apartment'>Apartment Number</label>
                <Input
                  size='large'
                  name={'apartment'}
                  value={state.apartment}
                  onChange={handleChange}
                ></Input>
              </div>

              {/* houseNo/buildingNo  */}
              <div className='house'>
                <label htmlFor='house'>House / Building #</label>
                <Input
                  size='large'
                  name={'house'}
                  value={state.house}
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
            {/* street*/}
            <div className='street'>
              <label htmlFor='street'>Street Address</label>
              <Input
                size='large'
                name={'street'}
                value={state.street}
                onChange={handleChange}
              ></Input>
            </div>

            <div className='box-2-inline'>
              {/* city  */}
              <div className='city'>
                <label htmlFor='city'>City</label>
                <Input
                  size='large'
                  name={'city'}
                  value={state.city}
                  onChange={handleChange}
                ></Input>
              </div>

              {/* province */}
              <div className='province'>
                <label htmlFor='province'>Province</label>
                <Input
                  size='large'
                  name={'province'}
                  value={state.province}
                  onChange={handleChange}
                ></Input>
              </div>
            </div>

            <div className='box-2-inline'>
              {/* country */}
              <div className='country'>
                <label htmlFor='country'>Country</label>
                <Input
                  size='large'
                  name={'country'}
                  value={state?.country}
                  onChange={handleChange}
                ></Input>
              </div>
              {/* postalCode */}
              <div className='postalCode'>
                <label htmlFor='postalCode'>Postal Code</label>
                <Input
                  size='large'
                  name={'postalCode'}
                  value={state.postalCode}
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
          </div>

          <Button
            type='primary'
            loading={state.updateLoading}
            size='large'
            block={true}
            htmlType='submit'
          >
            Submit
          </Button>
        </form>
        <ChangePassword />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  .dates {
    display: flex;
    gap: 1rem;
  }
  form {
    padding: 1rem;
  }

  @media (min-width: 992px) {
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      min-width: 800px;
    }
  }
  .box-2-inline {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
`

export default Profile
