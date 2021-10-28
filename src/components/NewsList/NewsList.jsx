import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'

import { stripHTML } from '../../utils'
import useResponsiveness from '../../hooks/useResponsiveness'

import SmallText from '../SmallText'
import FirstNews from '../FirstNews'
import SectionTitleMobile from '../SectionTitleMobile'
import WatchAllNews from '../WatchAllNews'
import AppearingText from '../AppearingText'

const Wrapper = styled.section`
  width: 100%;
  padding: ${({ isNewsPage }) => (isNewsPage ? '0 24px' : '24px')};
  padding-bottom: ${({ isNewsPage }) => (isNewsPage ? '0 24px' : '24px')};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-x: hidden;
  overflow-y: hidden;

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
  @media (min-width: 769px) {
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
    padding-left: ${({ isNewsPage }) => (isNewsPage ? 0 : '40px')};
    padding-right: ${({ isNewsPage }) => (isNewsPage ? 0 : '40px')};
  }
`

const HomeSection = styled.section`
  border-top: solid 1px
    ${({ theme, noBorder }) => (noBorder ? 'rgba(0, 0, 0, 0)' : theme.gray)};
  width: 100%;
  @media (min-width: 769px) {
    border: none;
    margin-top: 0px;
    padding: 0;
  }
`

const NewsListContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${({ isNewsPage }) =>
    isNewsPage &&
    css`
      max-width: 1100px;
      margin: 0 auto;
    `}
`

const NewsPreview = styled.article`
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

const Title = styled(motion.h3)`
  max-width: 725px;
  margin-left: auto;
`

const AppearingTitle = styled(AppearingText)`
  margin-bottom: 40px;
`

export default function NewsList({ news, title, lang, isNewsPage }) {
  const { isMobile } = useResponsiveness()

  const newsStart = isMobile ? 0 : 1

  return (
    <>
      <Wrapper id="news" dark={!isNewsPage} isNewsPage={isNewsPage}>
        <HomeSection noBorder>
          {!isNewsPage && (
            <>
              <SectionTitleMobile>News</SectionTitleMobile>
              <AppearingTitle component={Title} maxStrLength={40}>
                {title}
              </AppearingTitle>
            </>
          )}

          <NewsListContainer isNewsPage={isNewsPage}>
            <FirstNews news={news[0]} isNewsPage={isNewsPage} />
            {news.slice(newsStart).map(n => (
              <NewsPreview key={n.id}>
                <NewsDate>{n.date}</NewsDate>
                <NewsTitle>{n.title}</NewsTitle>
                <NewsExcerpt>{`${stripHTML(n.excerpt)}...`}</NewsExcerpt>
                <ReadMore to="#">
                  {lang === 'it' ? ' Leggi Tutto ' : 'Read More'}{' '}
                </ReadMore>
              </NewsPreview>
            ))}
          </NewsListContainer>
        </HomeSection>
        {!isNewsPage && <WatchAllNews />}
      </Wrapper>
    </>
  )
}
