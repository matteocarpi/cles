import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import ArrowRight from '../../assets/arrow-right.svg'
import useLang from '../../hooks/useLang'

const Wrapper = styled(Link)`
  display: flex;
  justify-content: flex-start;
  /* overflow-x: hidden; */
  width: 100vw;
`

const speed = 3

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

  @media (min-width: 768px) {
    font-size: 68px;
  }
`

export default function WatchAllNews({ className }) {
  const repetition = Array.from(Array(20).keys())

  const { lang } = useLang()

  const mapper = repetition.map(i => ({ i, key: Math.random() }))

  return (
    <Wrapper className={className} to="#">
      <Container>
        {mapper.map(i => (
          <ItemContainer key={i.key}>
            <Text>
              {lang === 'it' ? 'Guarda tutte le news' : 'Watch all news'}
            </Text>
            <ArrowRight />
          </ItemContainer>
        ))}
      </Container>
    </Wrapper>
  )
}
