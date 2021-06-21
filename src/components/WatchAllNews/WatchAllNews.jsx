import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import ArrowRight from '../../assets/arrow-right.svg'

const Wrapper = styled(Link)`
  display: flex;
  justify-content: flex-start;
  overflow-x: hidden;
  width: 100vw;
  transform: translateX(-24px);
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
`

export default function WatchAllNews({ lang, className }) {
  const repetition = Array.from(Array(20).keys())

  return (
    <Wrapper className={className} to="#">
      <Container>
        {repetition.map(() => (
          <ItemContainer>
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
