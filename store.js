import { configureStore } from '@reduxjs/toolkit'
import samplesSlice from './features/samples/samplesSlice'
import usersSlice from './features/users/usersSlice'
import contactsSlice from './features/contacts/contactsSlice'
import productsSlice from './features/products/productsSlice'
import categoriesSlice from './features/products/categoriesSlice'
import subcategoriesSlice from './features/products/subcategoriesSlice'

const store = configureStore({
  reducer: {
    samples: samplesSlice,
    users: usersSlice,
    contacts: contactsSlice,
    products: productsSlice,
    categories: categoriesSlice,
    subcategories: subcategoriesSlice,
  },
})

export default store
