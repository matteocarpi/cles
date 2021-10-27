import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageIntro from '../components/PageIntro/PageIntro'

function NewsListPage({ pageContext, data: pageData }) {
  const { lang, title, location } = pageContext

  return (
    <Layout title={title} lang={lang} location={location}>
      <PageIntro
        graphic={pageData.graphic.childImageSharp.gatsbyImageData}
        image={pageData.image.childImageSharp.gatsbyImageData}
        text={pageData.wpPage.newsPageData.description[lang]}
      />
    </Layout>
  )
}

export default NewsListPage

export const data = graphql`
  query NewsPage {
    wpPage(id: { eq: "cG9zdDo1NjI=" }) {
      title
      newsPageData {
        description {
          it
          en
        }
      }
    }
    image: file(name: { eq: "news-photo" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    graphic: file(name: { eq: "news-graphic" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    newsList: allWpPost {
      edges {
        node {
          slug
          featuredImage {
            node {
              localFile {
                childrenImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          content
          newsData {
            tradotta
            en {
              titolo
              contenuto
              url
            }
          }
        }
      }
    }
  }
`
