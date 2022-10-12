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

const speed = 5

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
  border: 1px solid ${({ theme }) => theme.yellow};
  border-bottom: 10px solid ${({ theme }) => theme.yellow};
  border-radius: 20px;
  padding: 10px 20px;
  &:hover {
    background-color: ${({ theme }) => theme.yellow};
    color: ${({ theme }) => theme.white};
    border-bottom: 10px solid ${({ theme }) => theme.red};
  }

  @media (min-width: 769px) {
    font-size: 30px;
  }
`

export default function AnimatedButton({ buttons }) {
  const repetition = Array.from(Array(20).keys())

  const { lang } = useLang()

  const mapper = repetition.map(i => ({ i, key: Math.random() }))
  const btnArray = [
    ...buttons,
    ...buttons,
    ...buttons,
    ...buttons,
    ...buttons,
    ...buttons,
  ]

  return (
    <Wrapper to={lang === 'it' ? '/news' : `/${lang}/news`}>
      <Container>
        {btnArray.map((client, index) => {
          return (
            <ItemContainer key={client.titolo[lang]}>
              <Text>
                {/* {lang === 'it' ? 'Guarda tutte le news' : 'Watch all news'} */}
                {client.titolo[lang]}
              </Text>
              <ArrowRight />
            </ItemContainer>
          )
        })}
      </Container>
    </Wrapper>
  )
}
