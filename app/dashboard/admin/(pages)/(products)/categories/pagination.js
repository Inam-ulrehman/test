import React from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getStateValues } from '@/features/products/categoriesSlice'
import styled from 'styled-components'

const PaginationComponent = () => {
  const { categories } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { page, nbHits, limit } = categories
  const onChange = (page, pageSize) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    dispatch(getStateValues({ name: 'page', value: page }))
    dispatch(getStateValues({ name: 'limit', value: pageSize }))
  }
  return (
    <Wrapper>
      {/* <Pagination current={page} onChange={onChange} total={nbHits} />; */}
      <Pagination
        current={page}
        onChange={onChange}
        total={nbHits}
        pageSize={limit}
        showSizeChanger={true}
        hideOnSinglePage={true}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  .ant-pagination {
    margin: 1rem;
  }
`
export default PaginationComponent
