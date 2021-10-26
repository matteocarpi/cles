import React from 'react'
import styled, { keyframes } from 'styled-components'

import Logo from '../../assets/logo-icon.svg'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  position: relative;
  width: 80px;
  height: 50px;
  animation: ${spin} infinite 3s linear;
  margin: 20px;
`

export default function Loading() {
  return (
    <Container>
      <Logo />
    </Container>
  )
}
