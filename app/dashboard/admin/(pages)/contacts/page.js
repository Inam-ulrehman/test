'use client'

import { allContactsThunk } from '@/features/contacts/contactsSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from './list'
import Search from './search'
import PaginationComponent from './pagination'

const Page = () => {
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)
  const { search, page, limit } = contacts

  useEffect(() => {
    dispatch(allContactsThunk(contacts))
  }, [search, page, limit])

  return (
    <div>
      <h1>
        Total {contacts.nbHits} / pageNo {contacts.page}
      </h1>
      <Search />
      <List />
      <PaginationComponent />
    </div>
  )
}

export default Page
