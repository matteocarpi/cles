import React from 'react'
import { useFormikContext } from 'formik'
import styled from 'styled-components'
import Loading from '../Loading'

const Button = styled.button`
  width: 200px;
  height: 56px;
  border: 2px solid #f6f3ea;
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.black};
  text-transform: uppercase;

  &:hover {
    border-color: white;
    font-weight: 400;
  }

  &:focus {
    background-color: white;
  }
`

export default function FormSubmit({ children }) {
  const { isSubmitting } = useFormikContext()

  return isSubmitting ? (
    <Loading light />
  ) : (
    <Button type="submit">{children}</Button>
  )
}
