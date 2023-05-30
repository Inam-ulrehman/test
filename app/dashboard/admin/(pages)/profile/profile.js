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
import { App } from 'antd'

const genderValue = ['male', 'female', 'other']

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
  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <>
      <Wrapper>
        <div className='dates'>
          <p>
            Created At
            <strong>{moment(state.createdAt).format('MMM Do YY')}</strong>
          </p>
          <p>
            Last updated
            <strong>{moment(state.updatedAt).format('MMM Do YY')}</strong>
          </p>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='profile'>
            {/* name input */}
            <FormInput
              label={'First Name'}
              name={'name'}
              value={state.name}
              onChange={handleChange}
            />
            {/* last name input */}
            <FormInput
              label={'Last Name'}
              name={'lastName'}
              value={state.lastName}
              onChange={handleChange}
            />
            {/* Date of birth input */}
            <div className='date-of-birth'>
              <FormInput
                label={'Date Of Birth'}
                type={'date'}
                name={'dob'}
                value={state.dob?.split('T')[0]}
                onChange={handleChange}
              />
            </div>
            {/* gender */}
            <div className='gender'>
              <label htmlFor='gender'>Gender</label>
              <select
                name='gender'
                value={state?.gender}
                onChange={handleChange}
              >
                {genderValue.map((item, index) => {
                  return (
                    <option
                      select={state?.gender?.toString()}
                      key={index}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                })}
              </select>
            </div>
            {/* Email input */}
            <FormInput
              name={'email'}
              value={state.email}
              onChange={handleChange}
            />
            {/* phone input */}
            <FormInput
              type={'number'}
              name={'phone'}
              value={state.phone === null ? '' : state.phone}
              onChange={handleChange}
            />
          </div>
          {/* ====================Box Divider=============*/}
          <div className='box-2'>
            <GooglePlacesHook state={state} setState={setState} />
            <div className='box-2-inline'>
              {/* apartment  */}
              <FormInput
                name='apartment'
                label={'Apartment Number'}
                placeholder={'#'}
                value={state?.apartment}
                onChange={handleChange}
              />
              {/* houseNo/buildingNo  */}
              <FormInput
                name='house'
                placeholder={'#'}
                label={'House / Building #'}
                value={state?.house}
                onChange={handleChange}
              />
            </div>
            {/* street*/}
            <FormInput
              name='street'
              label={'Street Address'}
              value={state?.street}
              onChange={handleChange}
            />
            <div className='box-2-inline'>
              {/* city  */}
              <FormInput
                name='city'
                value={state?.city}
                onChange={handleChange}
              />
              {/* province */}
              <FormInput
                name='province'
                value={state?.province}
                onChange={handleChange}
              />
            </div>
            {/* country */}
            <div className='box-2-inline'>
              <FormInput
                name='country'
                value={state?.country}
                onChange={handleChange}
              />
              {/* postalCode */}
              <FormInput
                name='postalCode'
                label='Postal Code'
                value={state?.postalCode}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={state.updateLoading}
              className='btn btn-block'
              type='submit'
            >
              {state.updateLoading ? 'Updating...' : 'Update details'}
            </button>
          </div>
        </form>
        <ChangePassword />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  .dates {
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    p {
      margin: 0;
    }
  }
  /* input {
    background-color: var(--gray-4);
  } */
  select,
  input {
    text-transform: capitalize;
  }
  .date-of-birth {
    input {
      text-transform: uppercase;
    }
  }
  .gender {
    padding: 5px 0;
    display: grid;
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
