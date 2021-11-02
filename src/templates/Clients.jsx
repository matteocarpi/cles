import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import useClientRect from '../hooks/useClientRect'

import Layout from '../components/Layout'
import PageIntro from '../components/PageIntro'
import ClientSection from '../components/ClientSection'

const Container = styled.section`
  margin-top: 20px;
  margin-bottom: 60px;
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 40px;
  }
`

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
      <Container ref={ref}>
        {data.wpPage.clientiData.clienti.map(client => (
          <ClientSection key={client.titolo[lang]} {...client} />
        ))}
      </Container>
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
