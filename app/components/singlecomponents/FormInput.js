import { Input } from 'antd'
import React from 'react'
import styled from 'styled-components'

const FormInput = ({ type, name, value, onChange, label, important }) => {
  return (
    <Wrapper>
      <label className='form-label' htmlFor={name}>
        {label || name} {important ? <span>*</span> : null}
      </label>
      <Input
        className='form-input'
        type={type || 'text'}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  span {
    color: var(--error);
  }
  input {
    border: 1px solid var(--gray-5);
  }
`
export default FormInput
