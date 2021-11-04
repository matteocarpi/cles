import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

const StyledLink = styled(GatsbyLink)`
  color: ${({ theme }) => theme.red};
  text-decoration: underline;

  &:visited {
    color: ${({ theme }) => theme.red};
    text-decoration: underline;
  }
`

export default function Link({ children, ...props }) {
  return <StyledLink {...props}>{children}</StyledLink>
}
