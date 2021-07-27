import React from 'react'
import styled from 'styled-components'

const Title = styled.h4`
  display: none;
  color: ${({ theme }) => theme.black};

  @media (min-width: 768px) {
    display: block;
  }
`
export default function SectionTitle({ children }) {
  return <Title>{children}</Title>
}
