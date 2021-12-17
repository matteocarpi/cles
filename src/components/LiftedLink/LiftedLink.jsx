import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  margin: 24px;
`

const StyledLink = styled(Link)`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 16px;
  border: 3px solid ${({ theme }) => theme.yellow};
  background-color: ${({ theme }) => theme.white};
  width: 230px;
  height: 70px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: 0.1s ease-in-out;
  padding: 0 1rem;

  &:hover {
    transform: translate(3px, 3px);
    z-index: 1;
  }
`

const Shadow = styled.div`
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  width: 230px;
  height: 70px;
  background-color: ${({ theme }) => theme.red};
  border: 3px solid ${({ theme }) => theme.yellow};
  z-index: -1;
`

export default function LiftedLink({ to, children }) {
  return (
    <Container>
      <StyledLink to={to}>{children}</StyledLink>
      <Shadow />
    </Container>
  )
}
