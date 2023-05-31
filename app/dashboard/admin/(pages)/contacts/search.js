import { getStateValues } from '@/features/contacts/contactsSlice'
import { Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Search = () => {
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state)

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    dispatch(getStateValues({ name, value }))
  }
  return (
    <Wrapper>
      <input
        type='text'
        name='search'
        value={contacts.search}
        onChange={handleChange}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .ant-input {
    background-color: pink;
    max-width: 400px;
    margin: 0 auto;
  }
`
export default Search
