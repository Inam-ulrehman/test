import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const List = () => {
  const { contacts } = useSelector((state) => state)
  const { list } = contacts

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
