import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import SmallText from '../components/SmallText'
import ArrowLeft from '../assets/arrow-left.svg'
import { backToNews } from '../const'

const Wrapper = styled.main`
  width: 100%;
  padding: 0 40px;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`

const Container = styled.section`
  position: relative;
  margin-top: calc(15.5vw + 130px);
  width: 100%;
  display: flex;
  align-items: flex-start;

  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: 130px;
  }
`

const Sidebar = styled.section`
  position: sticky;
  top: calc(15.5vw + 130px);
  width: 52%;
  padding-right: 40px;

  @media (max-width: 767px) {
    position: unset;
    margin: 0 auto 40px auto;
    margin-bottom: 40px;
    padding-right: 0;
  }
`

const Content = styled.article`
  width: 100%;
`

const Title = styled.h5`
  margin: 40px 0 30px 0;
`

const PostDate = styled(SmallText)``

const Text = styled.article`
  p {
    margin-bottom: 30px;
  }
`

const BackToNews = styled(Link)`
  width: 100%;
  margin: 90px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${({ theme }) => theme.yellow};

  &:visited {
    color: ${({ theme }) => theme.yellow};
  }

  svg {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 767px) {
    margin: 60px 0;
  }
`

function NewsPage({ pageContext, data }) {
  const { lang: originalLang, parentUrl } = pageContext

  const post = data.wpPost
  const { newsData } = post
  const { title, content, slug, date } = post
  const tradotta = !!newsData.tradotta

  const lang = tradotta ? originalLang : 'it'

  const postData = {
    title: {
      it: title,
      en: newsData.en.titolo,
    },
    content: {
      it: content,
      en: newsData.en.contenuto,
    },
    url: {
      it: originalLang === 'it' ? `/${slug}` : `/${lang}/${slug}`,
      en: newsData.en.url,
    },
  }

  const image =
    post.featuredImage.node.localFile.childImageSharp.gatsbyImageData

  return (
    <Layout
      lang={lang}
      title={postData.title[lang]}
      location={postData.url[lang]}
    >
      <Wrapper>
        <Container>
          <Sidebar>
            <GatsbyImage image={image} />
          </Sidebar>
          <Content>
            <PostDate>{date}</PostDate>
            <Title>{postData.title[lang]}</Title>
            <Text
              dangerouslySetInnerHTML={{ __html: postData.content[lang] }}
            />
          </Content>
        </Container>
        <BackToNews to={parentUrl}>
          <ArrowLeft />
          <h5>{backToNews[lang]}</h5>
        </BackToNews>
      </Wrapper>
    </Layout>
  )
}

export default NewsPage

export const data = graphql`
  query NewsQuery($id: String = "", $lang: String) {
    wpPost(id: { eq: $id }) {
      id
      date(locale: $lang, formatString: "DD MMMM YYYY")
      title
      content
      slug
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 0.75, width: 430)
            }
          }
        }
      }
      newsData {
        en {
          titolo
          contenuto
          url
        }
      }
    }
  }
`
