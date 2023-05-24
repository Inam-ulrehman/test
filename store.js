import { configureStore } from '@reduxjs/toolkit'
import samplesSlice from './features/samples/samplesSlice'
import usersSlice from './features/users/usersSlice'

const store = configureStore({
  reducer: {
    samples: samplesSlice,
    users: usersSlice,
  },
})

export default store
