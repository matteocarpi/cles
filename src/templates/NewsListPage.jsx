import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import usePagination from '../hooks/usePagination'
import useClientRect from '../hooks/useClientRect'

import Layout from '../components/Layout'
import PageIntro from '../components/PageIntro'
import NewsList from '../components/NewsList'
import PageNavigation from '../components/PageNavigation'

const Container = styled.section`
  max-width: 1100px;
  margin: 0 auto;
`

const StyledPageNavigation = styled(PageNavigation)`
  margin-bottom: 60px;
  margin-right: 0;
`

function NewsListPage({ pageContext, data: pageData }) {
  const [, ref] = useClientRect()
  const { lang, title, location } = pageContext

  const newsList = pageData.newsList.edges.map(n => n.node)

  const { currentItems, pages, setCurrentPage, currentPage } = usePagination({
    items: newsList,
    itemsPerPage: 10,
  })

  return (
    <Layout title={title} lang={lang} location={location}>
      <PageIntro
        graphic={pageData.graphic.childImageSharp.gatsbyImageData}
        image={pageData.image.childImageSharp.gatsbyImageData}
        text={pageData.wpPage.newsPageData.description[lang]}
      />
      <Container ref={ref}>
        <NewsList isNewsPage news={currentItems} lang={lang} />
        <StyledPageNavigation
          pages={pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Container>
    </Layout>
  )
}

export default NewsListPage

export const data = graphql`
  query NewsPage($lang: String) {
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
    newsList: allWpPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 1920)
                }
              }
            }
          }
          slug
          excerpt
          date(locale: $lang, formatString: "DD MMMM YYYY")
          newsData {
            tradotta
            en {
              titolo
              contenuto
            }
          }
        }
      }
    }
  }
`
