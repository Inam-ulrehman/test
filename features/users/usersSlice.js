import { customFetch } from '@/lib/axios/customFetch'
import { addObjectInState } from '@/lib/helper'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const initialState = {
  name: '',
  lastName: '',
  mobile: '',
  email: '',
  password: '',
  role: '',
  gender: '',
  dob: '',
  apartment: '',
  house: '',
  street: '',
  city: '',
  province: '',
  country: '',
  postalCode: '',
  verified: '',
  password: '',
  isMember: Cookies.get('Authorization_Token') ? true : false,
  isLoading: false,
  updateLoading: false,
}
export const usersThunk = createAsyncThunk(
  'users/usersThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.post('/user/login')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// get profile
export const usersGetProfileThunk = createAsyncThunk(
  'users/usersGetProfileThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('auth/user/getprofile')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// update profile
export const usersUpdateProfileThunk = createAsyncThunk(
  'users/usersUpdateProfileThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('auth/user/updateprofile', user)
      return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// ===============SLICE================
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload

      state[name] = value
    },
    clearState: (state, { payload }) => {
      state.name = ''
      state.email = ''
      state.password = ''
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(usersThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        state.isLoading = true
      })
      .addCase(usersThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(usersThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
      // user get profile thunk
      .addCase(usersGetProfileThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(usersGetProfileThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload.result[0], state)

        state.isLoading = false
      })
      .addCase(usersGetProfileThunk.rejected, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
      })
      // user Update profile thunk
      .addCase(usersUpdateProfileThunk.pending, (state, { payload }) => {
        state.updateLoading = true
      })
      .addCase(usersUpdateProfileThunk.fulfilled, (state, { payload }) => {
        state.updateLoading = false
      })
      .addCase(usersUpdateProfileThunk.rejected, (state, { payload }) => {
        console.log(payload)
        state.updateLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState } = usersSlice.actions
export default usersSlice.reducer
