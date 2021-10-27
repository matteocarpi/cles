import React from 'react' // , { useEffect }

import { graphql } from 'gatsby'

import Home from '../components/Home'

const defaultLang = 'it'

const IndexPage = ({ location, data }) => (
  // const isBrowser = typeof window !== 'undefined'

  // const locale = isBrowser && (navigator.language || navigator.userLanguage)

  // const lang = isBrowser && locale.substring(0, 2)

  // useEffect(
  //   () => isBrowser && navigate(lang === defaultLang ? '/' : `/${lang}`),
  //   [isBrowser, lang],
  // )

  <Home lang={defaultLang} location={location} data={data} />
)

export default IndexPage

export const data = graphql`
  query IndexQuery {
    homePage: wpPage(id: { eq: "cG9zdDoxNjI=" }) {
      homeData {
        title {
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
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
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
          date(formatString: "DD.MM.YYYY")
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
