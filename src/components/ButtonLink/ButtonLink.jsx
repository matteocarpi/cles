import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 200px;
  height: 56px;

  border: 3px solid ${({ theme }) => theme.yellow};
  padding: 1.5rem;
  color: ${({ theme }) => theme.black};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  opacity: 60%;

  &:hover {
    opacity: 100%;
  }

  &:active {
    background-color: ${({ theme }) => theme.yellow};
  }
`

export default function ButtonLink({ to, children }) {
  return <Container to={to}>{children}</Container>
}
