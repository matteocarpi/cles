import React from 'react'

import { graphql } from 'gatsby'
import HomeComponent from '../components/Home'

export default function Home({ pageContext, data }) {
  const { lang, location } = pageContext

  return <HomeComponent lang={lang} location={location} data={data} />
}

export const data = graphql`
  query HomeQuery($lang: String) {
    homePage: wpPage(id: { eq: "cG9zdDoxNjI=" }) {
      homeData {
        tuttulo {
          en
          it
        }
        immagine {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        slogan {
          en
          it
        }
        bio {
          it
          en
        }
        secondaImmagine {
          localFile {
            publicURL
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        services {
          titolo {
            it
            en
          }
          descrizione {
            it
            en
          }
        }
        clients {
          titolo {
            it
            en
          }
        }
        news {
          titolo {
            it
            en
          }
        }
      }
    }
    clientiPage: wpPage(id: { eq: "cG9zdDo0MjE=" }) {
      clientiData {
        title {
          it
          en
        }
        clienti {
          fieldGroupName
          titolo {
            it
            en
          }
        }
      }
    }
    allWpPost(limit: 3) {
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
