import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import ArrowRight from '../../assets/arrow-right.svg'
import useLang from '../../hooks/useLang'

const Wrapper = styled(Link)`
  display: flex;
  justify-content: flex-start;
  width: 100vw;
  margin-top: 20px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    margin-bottom: calc(90px - 24px);
  }
`

const speed = 20

const movementSpeed = 200 / speed

const Container = styled.div`
  display: flex;
  animation: slide ${movementSpeed}s linear infinite;

  @keyframes slide {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

const Text = styled.h4`
  color: ${({ theme }) => theme.yellow};
  margin: 0 2rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 16px;
  /* @media (min-width: 769px) {
    font-size: 16px;
  } */
`

export default function AnimatedButton({ className, children, buttons }) {
  const repetition = Array.from(Array(20).keys())

  const { lang } = useLang()

  const mapper = repetition.map(i => ({ i, key: Math.random() }))

  return (
    <Wrapper className={className}>
      <Container>{children}</Container>
    </Wrapper>
  )
}
