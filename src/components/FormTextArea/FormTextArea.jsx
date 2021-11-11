import React, { useEffect, useRef } from 'react'
import { useField } from 'formik'
import styled from 'styled-components'
import autosize from 'autosize'

const TextArea = styled.textarea`
  margin-bottom: 25px;
  width: 100%;
  color: ${({ theme }) => theme.black};
  padding-bottom: 25px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.yellow};

  font-size: 16px;

  border-bottom-color: ${({ theme, error }) =>
    error ? theme.red : theme.black};
  color: ${({ theme, error }) => (error ? theme.red : theme.black)};
  @media (min-width: 768px) {
    height: 56px;
  }

  &::placeholder {
    color: ${({ theme, error }) => (error ? theme.red : theme.black)};
    text-transform: uppercase;
  }

  &:focus {
    outline: none;
  }
`

export default function FormTextArea({ name, placeholder }) {
  const [field, meta, helpers] = useField(name)

  const ref = useRef()

  useEffect(() => {
    autosize(ref.current)
  })

  return (
    <TextArea
      ref={ref}
      onChange={e => helpers.setValue(e.target.value)}
      value={field.value}
      error={meta.touched && !!meta.error}
      placeholder={placeholder}
    />
  )
}
