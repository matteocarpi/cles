import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { stripHTML } from '../../utils'
import useLang from '../../hooks/useLang'

import SmallText from '../SmallText'

const Container = styled.article`
  border: solid 5px ${({ theme }) => theme.yellow};
  padding: 24px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 725px;

  @media (min-width: 768px) {
    margin-bottom: 80px;
  }
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

export default function NewsPreview({ title, date, excerpt, slug, newsData }) {
  const { lang } = useLang()

  const content = {
    title: {
      it: title,
      en: newsData.en?.titolo ?? title,
    },
    content: {
      it: excerpt,
      en: newsData.en?.contenuto ?? excerpt,
    },
    url: {
      it: `/${slug}`,
      en: newsData.en?.url ?? `/${lang}/${slug}`,
    },
  }

  return (
    <Container>
      <NewsDate>{date}</NewsDate>
      <NewsTitle>{content.title[lang]}</NewsTitle>
      <NewsExcerpt>{`${stripHTML(content.content[lang])}...`}</NewsExcerpt>
      <ReadMore to={content.url[lang]}>
        {lang === 'it' ? ' Leggi Tutto ' : 'Read More'}{' '}
      </ReadMore>
    </Container>
  )
}
