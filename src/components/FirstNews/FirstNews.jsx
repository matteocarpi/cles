import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { stripHTML } from '../../utils'
import SmallText from '../SmallText'

const Wrapper = styled.article`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

const Container = styled.div``

const TextContainer = styled.article`
  border: solid 5px ${({ theme }) => theme.yellow};
  padding: 24px;
  margin-bottom: 40px;
`

const NewsDate = styled(SmallText)`
  padding-bottom: 40px;
`

const NewsTitle = styled.h5`
  margin: 40px 0;
`

const NewsExcerpt = styled.p``

const ReadMore = styled(Link)`
  color: ${({ theme }) => theme.yellow};
  &:visited {
    color: ${({ theme }) => theme.yellow};
  }
  font-weight: 600;
  text-decoration: underline;
`

export default function FirstNews({ lang, news }) {
  return (
    <Wrapper>
      <Container>
        <TextContainer key={news.id}>
          <NewsDate>{news.date}</NewsDate>
          <NewsTitle>{news.title}</NewsTitle>
          <NewsExcerpt>{`${stripHTML(news.excerpt)}...`}</NewsExcerpt>
          <ReadMore to="#">
            {lang === 'it' ? ' Leggi Tutto ' : 'Read More'}{' '}
          </ReadMore>
        </TextContainer>
      </Container>
    </Wrapper>
  )
}
