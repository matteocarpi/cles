import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { stripHTML } from '../../utils'
import SmallText from '../SmallText'

const Wrapper = styled.article`
  display: none;
  width: 100%;
  @media (min-width: 768px) {
    display: block;
    margin-bottom: 40px;
  }
`

const Container = styled.div``

const TextContainer = styled.article`
  border: solid 5px ${({ theme }) => theme.yellow};
  padding: 24px;

  @media (min-width: 768px) {
    max-height: 340px;
  }
`
const Separator = styled.div`
  height: 40px;
  display: flex;
`

const CWrapper = styled.div`
  width: 100%;
  position: relative;

  ${({ right }) =>
    right &&
    css`
      overflow-x: hidden;
    `}
`
const C = styled.div`
  position: absolute;
  border: solid 5px ${({ theme }) => theme.yellow};
  width: 50px;
  height: 50px;
  top: -5px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  border-right: none;

  ${({ left }) =>
    left
      ? css`
          left: -20px;
        `
      : css`
          right: -20px;
        `};
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

const Image = styled(GatsbyImage)`
  border: solid 5px ${({ theme }) => theme.yellow};
  max-height: 340px;
`

export default function FirstNews({ lang, news }) {
  const data = useStaticQuery(graphql`
    query FirsNewsImage {
      defaultImage: file(name: { eq: "default-image" }) {
        childImageSharp {
          gatsbyImageData(width: 1920)
        }
      }
    }
  `)

  const image = getImage(
    news.featuredImage?.node.localFile ?? data.defaultImage,
  )

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
        <Separator>
          <CWrapper>
            <C left />
          </CWrapper>
          <CWrapper right>
            <C />
          </CWrapper>
        </Separator>
        <Image image={image} />
      </Container>
    </Wrapper>
  )
}
