import React from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getStateValues } from '@/features/contacts/contactsSlice'
import styled from 'styled-components'

const PaginationComponent = () => {
  const { contacts } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { page, nbHits, limit } = contacts
  const onChange = (page, pageSize) => {
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
