import React from 'react'
import styled from 'styled-components'

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

  background-color: ${({ highlight }) => highlight && 'white'};
`

export default function LightButton({ children, ...props }) {
  return <Button {...props}>{children}</Button>
}
