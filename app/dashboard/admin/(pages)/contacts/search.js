import { getStateValues } from '@/features/contacts/contactsSlice'
import { Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const SearchComponent = () => {
  const { Search } = Input
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    dispatch(getStateValues({ name, value }))
  }
  return (
    <Wrapper>
      <Search
        name='search'
        value={contacts.search}
        onChange={handleChange}
        placeholder='search here'
        size='large'
        loading={contacts.isLoading}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .ant-input-search {
    max-width: 400px;
  }
`
export default SearchComponent
