import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import useResponsiveness from '../../hooks/useResponsiveness'

import FirstNews from '../FirstNews'
import SectionTitleMobile from '../SectionTitleMobile'
import WatchAllNews from '../WatchAllNews'
import AppearingText from '../AppearingText'
import NewsPreview from '../NewsPreview'

const Wrapper = styled.section`
  width: 100%;
  padding: ${({ isNewsPage }) => (isNewsPage ? '0 24px' : '90px 24px 0 24px')};
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

const Title = styled(motion.h3)`
  max-width: 725px;
  margin-left: auto;
  margin-bottom: 0;
`

const TitleContainer = styled.div`
  margin-bottom: 90px;
`

const AppearingTitle = styled(AppearingText)``

export default function NewsList({ news, title, isNewsPage }) {
  const { isMobile } = useResponsiveness()

  const newsStart = isMobile ? 0 : 1

  return (
    <>
      <Wrapper id="news" dark={!isNewsPage} isNewsPage={isNewsPage}>
        <HomeSection noBorder>
          {!isNewsPage && (
            <TitleContainer>
              <SectionTitleMobile>News</SectionTitleMobile>
              <AppearingTitle component={Title} maxStrLength={40}>
                {title}
              </AppearingTitle>
            </TitleContainer>
          )}

          <NewsListContainer isNewsPage={isNewsPage}>
            <FirstNews news={news[0]} isNewsPage={isNewsPage} />
            {news.slice(newsStart).map(n => (
              <NewsPreview key={n.id} {...n} />
            ))}
          </NewsListContainer>
        </HomeSection>
        {!isNewsPage && <WatchAllNews />}
      </Wrapper>
    </>
  )
}
