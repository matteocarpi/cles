import React from 'react'
import styled from 'styled-components'

const Title = styled.h4`
  display: none;
  color: ${({ theme }) => theme.black};

  @media (min-width: 769px) {
    display: block;
  }
`
export default function SectionTitle({ children, className }) {
  return <Title className={className}>{children}</Title>
}
