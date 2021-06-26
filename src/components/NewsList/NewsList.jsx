import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { stripHTML } from '../../utils'

import SmallText from '../SmallText'
import FirstNews from '../FirstNews'
import SectionTitleMobile from '../SectionTitleMobile'

const Wrapper = styled.section`
  width: 100%;
  padding: 24px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-x: hidden;

  ${({ dark, theme }) =>
    dark &&
    css`
      background-color: ${theme.black};
      border-bottom: solid 2px ${theme.yellow};
      color: ${theme.white};
      ${HomeSection} {
        border-top: solid 2px ${theme.yellow};
      }
    `}
  @media (min-width: 768px) {
    ${({ dark, theme }) =>
      dark &&
      css`
        ${Title} {
          color: ${theme.yellow};
        }
        ${HomeSection} {
          border-top: none;
        }
      `}
    padding-left: 40px;
    padding-right: 40px;
  }
`

const HomeSection = styled.section`
  border-top: solid 1px ${({ theme }) => theme.gray};
  width: 100%;
  @media (min-width: 768px) {
    border: none;
    margin-top: 200px;
    padding: 0;
  }
`

const NewsListContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const NewsPreview = styled.article`
  border: solid 5px ${({ theme }) => theme.yellow};
  padding: 24px;
  margin-bottom: 40px;
  max-width: 900px;
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

const Title = styled.h3`
  max-width: 900px;
  margin-left: auto;
`

export default function NewsList({ news, title }) {
  return (
    <Wrapper dark>
      <HomeSection id="news">
        <SectionTitleMobile>News</SectionTitleMobile>
        <Title>{title}</Title>

        <NewsListContainer>
          <FirstNews news={news[0]} />
          {news.map(n => (
            <NewsPreview key={n.id}>
              <NewsDate>{n.date}</NewsDate>
              <NewsTitle>{n.title}</NewsTitle>
              <NewsExcerpt>{`${stripHTML(n.excerpt)}...`}</NewsExcerpt>
              <ReadMore to="#">Leggi Tutto</ReadMore>
            </NewsPreview>
          ))}
        </NewsListContainer>
      </HomeSection>
    </Wrapper>
  )
}
