import { configureStore } from '@reduxjs/toolkit'
import samplesSlice from './features/samples/samplesSlice'
import usersSlice from './features/users/usersSlice'
import contactsSlice from './features/contacts/contactsSlice'

const store = configureStore({
  reducer: {
    samples: samplesSlice,
    users: usersSlice,
    contacts: contactsSlice,
  },
})

export default store
