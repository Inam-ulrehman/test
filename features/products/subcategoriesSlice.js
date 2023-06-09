import { customFetch } from '@/lib/axios/customFetch'
import { addObjectInState } from '@/lib/helper'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  images: [],
  nbHits: '',
  _id: '',
  createdAt: '',
  updatedAt: '',
  createdBy: '',
  list: [],
  deleteMany: [],
  search: '',
  limit: 10,
  page: 1,
  sort: '-createdAt',
  singlePageError: '',
  currentPage: 0,
  revalidate: false,
  isLoading: false,
  editLoading: false,
  edit: true,
}
export const subcategoriesThunk = createAsyncThunk(
  'subcategories/subcategoriesThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch('')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Create subcategories thunk
export const createCategoriesThunk = createAsyncThunk(
  'subcategories/createCategoriesThunk',
  async (values, thunkAPI) => {
    const { subcategories, message } = values
    try {
      const response = await customFetch.post(
        '/authadmin/product/subcategory/create',
        subcategories
      )

      return response.data.result
    } catch (error) {
      message.error(error.response?.data?.msg)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// all subcategories thunk
export const allCategoriesThunk = createAsyncThunk(
  'subcategories/allCategoriesThunk',
  async (state, thunkAPI) => {
    const { search, page, limit, sort } = state

    try {
      const response = await customFetch(
        `/authadmin/product/subcategory/all?search=${search}&sort=${sort}&page=${page}&limit=${limit}`
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

//  single subcategories

export const singleCategoriesThunk = createAsyncThunk(
  'subcategories/singleCategoriesThunk',
  async (state, thunkAPI) => {
    try {
      const response = await customFetch.post(
        '/authadmin/product/subcategory/single',
        state
      )

      return response.data.result
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//  update subcategories

export const updateCategoriesThunk = createAsyncThunk(
  'subcategories/updateCategoriesThunk',
  async (values, thunkAPI) => {
    const { subcategories, message } = values
    try {
      const response = await customFetch.patch(
        '/authadmin/product/subcategory/update',
        subcategories
      )

      return response.data.result
    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.msg)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const subcategoriesSlice = createSlice({
  name: 'subcategories',
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
      state.images = []
      state._id = ''
      state.createdAt = ''
      state.updatedAt = ''
      state.createdBy = ''
      state.search = ''
      state.currentPage = 0
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(subcategoriesThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        state.isLoading = true
      })
      .addCase(subcategoriesThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(subcategoriesThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
      // create subcategories thunk
      .addCase(createCategoriesThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(createCategoriesThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload, state)
        state.currentPage = state.currentPage + 1
        state.isLoading = false
      })
      .addCase(createCategoriesThunk.rejected, (state, { payload }) => {
        state.isLoading = false
      })
      // all subcategories thunk
      .addCase(allCategoriesThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(allCategoriesThunk.fulfilled, (state, { payload }) => {
        state.list = payload.result
        state.nbHits = payload.nbHits
        state.isLoading = false
      })
      .addCase(allCategoriesThunk.rejected, (state, { payload }) => {
        state.isLoading = false
      })
      // single subcategories thunk
      .addCase(singleCategoriesThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(singleCategoriesThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload, state)
        state.singlePageError = ''
        state.isLoading = false
      })
      .addCase(singleCategoriesThunk.rejected, (state, { payload }) => {
        state.singlePageError = payload
        state.isLoading = false
      })
      // update subcategories thunk
      .addCase(updateCategoriesThunk.pending, (state, { payload }) => {
        state.editLoading = true
      })
      .addCase(updateCategoriesThunk.fulfilled, (state, { payload }) => {
        if (state.currentPage === 1) {
          // Do nothing if the current page is 1
        } else {
          state.currentPage = state.currentPage + 1
        }
        state.editLoading = false
      })
      .addCase(updateCategoriesThunk.rejected, (state, { payload }) => {
        state.editLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState } =
  subcategoriesSlice.actions
export default subcategoriesSlice.reducer
