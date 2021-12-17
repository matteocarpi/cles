import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import useClientRect from '../hooks/useClientRect'

import Layout from '../components/Layout'
import PageIntro from '../components/PageIntro'
import ClientSection from '../components/ClientSection'
import useResponsiveness from '../hooks/useResponsiveness'

const Container = styled.section`
  margin-top: 20px;
  margin-bottom: 60px;
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 40px;
  }
`

function Clients({ data, pageContext }) {
  const { lang, location, parentUrl } = pageContext
  const [, ref] = useClientRect()

  const { isMobile } = useResponsiveness()

  return (
    <Layout
      title={data.wpPage.clientiData.title[lang]}
      lang={lang}
      location={location}
      parentUrl={parentUrl}
    >
      <PageIntro
        text={data.wpPage.clientiData.description[lang]}
        graphic={data.graphic.childImageSharp.gatsbyImageData}
        image={data.image.childImageSharp.gatsbyImageData}
        reverseImages
        verticalAlignment="flex-end"
        leftTranslate={!isMobile && -30}
      />

      <Container ref={ref}>
        {data.wpPage.clientiData.clienti.map(client => (
          <ClientSection
            id={client.titolo[lang].replaceAll(' ', '')}
            key={client.titolo[lang]}
            {...client}
          />
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
