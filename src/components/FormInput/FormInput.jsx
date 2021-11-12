import React from 'react'
import { useField } from 'formik'
import styled, { css } from 'styled-components'

const Input = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.black};
  padding-bottom: 25px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.yellow};
  margin-bottom: 25px;

  font-size: 16px;

  border-bottom-color: ${({ theme, error }) =>
    error ? theme.red : theme.black};
  color: ${({ theme, error }) => (error ? theme.red : theme.black)};

  &::placeholder {
    text-transform: uppercase;
    color: ${({ theme, error, light }) =>
      // eslint-disable-next-line no-nested-ternary
      error ? theme.red : light ? theme.gray : theme.black};
  }

  &:focus {
    outline: none;
  }

  ${({ light, theme, error }) =>
    light &&
    css`
      color: ${theme.gray};
      background-color: transparent;
      border-bottom-color: ${error ? theme.red : theme.gray}};
    `}
`

export default function FormInput({ name, placeholder, light, type = 'text' }) {
  const [field, meta, helpers] = useField(name)

  return (
    <Input
      light={light}
      onChange={e => helpers.setValue(e.target.value)}
      value={field.value}
      error={meta.touched && !!meta.error}
      placeholder={placeholder}
      type={type}
    />
  )
}
