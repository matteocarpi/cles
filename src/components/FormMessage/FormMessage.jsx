import React from 'react'
import styled from 'styled-components'

const Message = styled.p`
  color: ${({ theme, isError }) => (isError ? theme.red : theme.green)};
  margin-bottom: 0;
`

export default function FormMessage({ isError, children }) {
  return <Message isError={isError}>{children}</Message>
}
