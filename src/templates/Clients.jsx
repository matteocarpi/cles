import React from 'react'
import { graphql } from 'gatsby'

import useClientRect from '../hooks/useClientRect'

import Layout from '../components/Layout'
import PageIntro from '../components/PageIntro'

function Clients({ data, pageContext }) {
  const { lang, location } = pageContext
  const [, ref] = useClientRect()

  return (
    <Layout
      title={data.wpPage.clientiData.title[lang]}
      lang={lang}
      location={location}
    >
      <PageIntro
        text={data.wpPage.clientiData.description[lang]}
        graphic={data.graphic.childImageSharp.gatsbyImageData}
        image={data.image.childImageSharp.gatsbyImageData}
        reverseImages
      />
      <div ref={ref} />
    </Layout>
  )
}

export default Clients

export const data = graphql`
  query Clienti {
    wpPage(id: { eq: "cG9zdDo0MjE=" }) {
      id
      slug
      clientiData {
        title {
          it
          en
        }
        description {
          it
          en
        }
        uri {
          en
        }
        clienti {
          titolo {
            it
            en
          }
          loghi {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
    image: file(name: { eq: "clienti-photo" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    graphic: file(name: { eq: "clienti-graphic" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
