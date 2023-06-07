'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from './list'
import SearchComponent from './search'
import PaginationComponent from './pagination'
import styled from 'styled-components'
import { Typography } from 'antd'
import { allCategoriesThunk } from '@/features/products/categoriesSlice'
const { Text } = Typography

const Page = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state)
  const { search, page, limit, revalidate, nbHits } = categories

  useEffect(() => {
    dispatch(allCategoriesThunk(categories))
  }, [search, page, limit, revalidate])

  return (
    <Wrapper>
      <div className='search-box'>
        <div className='title'>
          <div className='title-1'>
            <Text>Total Results:</Text> <Text strong>{nbHits}</Text>
          </div>
          <div className='title-2'>
            <Text>Page No:</Text> <Text strong>{page}</Text>
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
