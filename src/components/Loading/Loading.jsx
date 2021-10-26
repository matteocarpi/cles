import React from 'react'
import styled, { keyframes } from 'styled-components'

import Logo from '../Logo'

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
`

const StyledLogo = styled(Logo)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  width: 100%;
  height: 100%;
`

export default function Loading() {
  return (
    <Container>
      <StyledLogo />
    </Container>
  )
}
