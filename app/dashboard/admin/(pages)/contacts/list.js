import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const List = () => {
  const { contacts } = useSelector((state) => state)
  const { list } = contacts

  if (contacts.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      {list.map((item, index) => {
        return <div key={index}>{item.name}</div>
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default List
