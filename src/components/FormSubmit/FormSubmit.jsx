import React from 'react'
import { useFormikContext } from 'formik'
import styled from 'styled-components'
import Loading from '../Loading'

const Button = styled.button`
  width: 200px;
  height: 56px;
  border: 2px solid white;
  font-size: 16px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray};
`

export default function FormSubmit({ children }) {
  const { isSubmitting } = useFormikContext()

  return isSubmitting ? (
    <Loading light />
  ) : (
    <Button type="submit">{children}</Button>
  )
}
