import { getStateValues } from '@/features/contacts/contactsSlice'
import { Form, Input, Select } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const SearchComponent = () => {
  const { Search } = Input
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)
  const { revalidate } = contacts

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    dispatch(getStateValues({ name, value }))
  }
  const handleSelect = (e) => {
    dispatch(getStateValues({ name: 'sort', value: e }))
    dispatch(getStateValues({ name: 'revalidate', value: !revalidate }))
  }
  return (
    <Wrapper>
      <Search
        name='search'
        value={contacts.search}
        onChange={handleChange}
        placeholder='Name Email Mobile'
        size='medium'
        loading={contacts.isLoading}
        autoComplete='off'
        onTouchStart={(e) => e.preventDefault()}
      />
      <Select
        defaultValue=''
        style={{ width: 120 }}
        onChange={handleSelect}
        options={[
          { value: '', label: 'Sort By' },
          { value: '-createdAt', label: 'New' },
          { value: 'createdAt', label: 'Old' },
        ]}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  .ant-input-search {
    max-width: 400px;
  }
`
export default SearchComponent
