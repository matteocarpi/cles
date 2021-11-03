import React from 'react'
import { useField } from 'formik'
import styled from 'styled-components'

const Input = styled.input`
  width: 100%;
  text-transform: uppercase;
  color: ${({ theme }) => theme.black};
  padding-bottom: 25px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.yellow};
  margin-bottom: 25px;

  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 24px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.black};
  }

  &:focus {
    outline: none;
  }
`

export default function FormInput({ name, placeholder }) {
  const [field, meta, helpers] = useField(name)

  return (
    <Input
      onChange={e => helpers.setValue(e.target.value)}
      value={field.value}
      errors={!!meta.error}
      placeholder={placeholder}
    />
  )
}
