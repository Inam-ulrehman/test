'use client'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '@/lib/localStorage/localStorage'
import { VscColorMode } from 'react-icons/vsc'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
const theme = getItemFromLocalStorage('theme')
const Theme = () => {
  const [state, setState] = useState('')
  const changeTheme = () => {
    const theme = getItemFromLocalStorage('theme')
    if (!theme) {
      setState('dark')
      setItemInLocalStorage('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      setState('light')
      removeItemFromLocalStorage('theme', 'dark')
      document.documentElement.classList.remove('dark')
    }
  }
  useEffect(() => {
    const theme = getItemFromLocalStorage('theme')
    if (theme) {
      setState('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])
  return (
    <Wrapper state={state}>
      <button onClick={changeTheme}>
        {state === 'dark' ? 'Light' : 'Dark'} theme
        <VscColorMode />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  button {
    background-color: ${(props) =>
      props.state === 'dark' ? 'var(--gray-2)' : 'var(--gray-8)'};
    :hover {
      cursor: pointer;
    }
  }
  color: ${(props) => (props.state === 'dark' ? 'black' : 'white')};
`
export default Theme
