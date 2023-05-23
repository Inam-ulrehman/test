import { configureStore } from '@reduxjs/toolkit'
import samplesSlice from './features/samples/samplesSlice'

const store = configureStore({
  reducer: {
    samples: samplesSlice,
  },
})

export default store
