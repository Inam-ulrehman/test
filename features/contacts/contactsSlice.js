import { customFetch } from '@/lib/axios/customFetch'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
  nbHits: '',
  list: [],
  deleteMany: [],
  search: '',
  limit: 10,
  page: 1,
  isLoading: false,
}
export const contactsThunk = createAsyncThunk(
  'contacts/contactsThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch('')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// all contacts thunk
export const allContactsThunk = createAsyncThunk(
  'contacts/allContactsThunk',
  async (state, thunkAPI) => {
    const { search, page, limit } = state

    try {
      const response = await customFetch(
        `/authadmin/contact/all?search=${search}&page=${page}&limit=${limit}`
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      if (name === 'search') {
        state.page = 1
      }

      state[name] = value
    },
    clearState: (state, { payload }) => {
      state.name = ''
      state.lastName = ''
      state.email = ''
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(contactsThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        state.isLoading = true
      })
      .addCase(contactsThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(contactsThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
      // all contacts thunk
      .addCase(allContactsThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(allContactsThunk.fulfilled, (state, { payload }) => {
        state.list = payload.result
        state.nbHits = payload.nbHits
        state.isLoading = false
      })
      .addCase(allContactsThunk.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState } =
  contactsSlice.actions
export default contactsSlice.reducer
