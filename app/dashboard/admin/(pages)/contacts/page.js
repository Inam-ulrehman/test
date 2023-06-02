'use client'

import { allContactsThunk } from '@/features/contacts/contactsSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from './list'
import SearchComponent from './search'
import PaginationComponent from './pagination'
import styled from 'styled-components'
import { Typography } from 'antd'
const { Text } = Typography

const Page = () => {
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)
  const { search, page, limit, revalidate } = contacts

  useEffect(() => {
    dispatch(allContactsThunk(contacts))
  }, [search, page, limit, revalidate])

  return (
    <Wrapper>
      <div className='search-box'>
        <div className='title'>
          <div className='title-1'>
            {' '}
            <Text>Total Results:</Text> <Text strong>{contacts.nbHits}</Text>
          </div>
          <div className='title-2'>
            <Text>Page No:</Text> <Text strong>{contacts.page}</Text>
          </div>
        </div>
        <SearchComponent />
      </div>
      <List />
      <PaginationComponent />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title {
    display: flex;
    .title-2 {
      margin: 0 1rem;
    }
  }
  .search-box {
  }
  @media (min-width: 678px) {
    .search-box {
      display: flex;
    }
  }
`
export default Page
