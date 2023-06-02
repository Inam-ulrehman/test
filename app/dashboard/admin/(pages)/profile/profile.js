'use client'
import moment from 'moment/moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import ChangePassword from './ChangePassword'
import { App, Button, DatePicker, Input, Select } from 'antd'
import ApiLoading from '@/app/components/singlecomponents/apiLoading'
import {
  getStateValues,
  usersGetProfileThunk,
  usersUpdateProfileThunk,
} from '@/features/users/usersSlice'
import GooglePlacesHook from './GooglePlacesHook'

const Profile = () => {
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(usersUpdateProfileThunk(users))
    if (result.payload.success) {
      return notification.success({ message: result.payload.msg })
    }
    notification.error({ message: result?.payload?.msg })
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  const handleDatePickerChange = (date, dateString) => {
    const formattedDate = moment(dateString).toISOString()
    dispatch(getStateValues({ name: 'dob', value: formattedDate }))
  }
  const handleGenderChange = (value) => {
    dispatch(getStateValues({ name: 'gender', value }))
  }

  useEffect(() => {
    dispatch(usersGetProfileThunk())

    // eslint-disable-next-line
  }, [])
  if (users.isLoading) {
    return <ApiLoading />
  }
  return (
    <>
      <Wrapper>
        <div className='dates'>
          <p>
            Member Since :
            <strong> {moment(users?.createdAt).format('MMM Do YY')}</strong>
          </p>
          <p>
            Last updated :
            <strong> {moment(users?.updatedAt).format('MMM Do YY')}</strong>
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
                value={users?.name}
                onChange={handleChange}
                required
              ></Input>
              {!users?.name && (
                <p style={{ color: 'red' }}>Please provide Name</p>
              )}
            </div>

            {/* last name input */}
            <div className='lastName'>
              <label htmlFor='lastName'>Last Name</label>
              <Input
                size='large'
                name={'lastName'}
                value={users?.lastName}
                onChange={handleChange}
              ></Input>
            </div>

            {/* Date of birth input */}
            <div className='dob'>
              <label htmlFor='dob'>Date Of Birth</label>

              <DatePicker
                value={users?.dob ? moment(users?.dob) : null}
                style={{ display: 'block', maxWidth: '100%' }}
                onChange={handleDatePickerChange}
                size='large'
              />
            </div>
            {/* gender */}
            <div className='gender'>
              <label htmlFor='gender'>Gender</label>
              <Select
                defaultValue={users?.gender ? users?.gender : 'Select'}
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
                style={{ textTransform: 'lowercase' }}
                value={users?.email}
                onChange={handleChange}
                required
              ></Input>
              {!users?.email && (
                <p style={{ color: 'red' }}>Please provide email</p>
              )}
            </div>

            {/* mobile input */}
            <div className='mobile'>
              <label htmlFor='mobile'>Mobile</label>
              <Input
                type='number'
                size='large'
                name={'mobile'}
                // users?.mobile === null ? '' : users?.mobile
                value={users?.mobile}
                onChange={handleChange}
              ></Input>
            </div>
          </div>
          {/* ====================Box Divider=============*/}
          <div className='box-2'>
            <GooglePlacesHook />
            <div className='box-2-inline'>
              {/* apartment  */}
              <div className='apartment'>
                <label htmlFor='apartment'>Apartment Number</label>
                <Input
                  size='large'
                  name={'apartment'}
                  value={users?.apartment}
                  onChange={handleChange}
                ></Input>
              </div>

              {/* houseNo/buildingNo  */}
              <div className='house'>
                <label htmlFor='house'>House / Building #</label>
                <Input
                  size='large'
                  name={'house'}
                  value={users?.house}
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
                value={users?.street}
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
                  value={users?.city}
                  onChange={handleChange}
                ></Input>
              </div>

              {/* province */}
              <div className='province'>
                <label htmlFor='province'>Province</label>
                <Input
                  size='large'
                  name={'province'}
                  value={users?.province}
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
                  value={users?.country}
                  onChange={handleChange}
                ></Input>
              </div>
              {/* postalCode */}
              <div className='postalCode'>
                <label htmlFor='postalCode'>Postal Code</label>
                <Input
                  size='large'
                  name={'postalCode'}
                  style={{ textTransform: 'uppercase' }}
                  value={users?.postalCode}
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
          </div>

          <Button
            type='primary'
            loading={users?.updateLoading}
            size='large'
            block={true}
            htmlType='submit'
            style={{ marginTop: '1rem' }}
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
    input {
      text-transform: capitalize;
    }
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
