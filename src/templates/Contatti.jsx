import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'

const Wrapper = styled.main`
  margin-top: 124px;
`
const Container = styled.section`
  background-color: ${({ theme }) => theme.yellow};
  padding: 0 24px;
`

const PageSlice = styled.article`
  padding-top: 30px;

  &:first-child {
    padding-top: 40px;
  }
`

const Title = styled.h6`
  text-transform: uppercase;
  padding-bottom: 25px;
`

const Content = styled.div``

const Text = styled.h5``

const Link = styled.a``

const SocialLink = styled.a`
  color: ${({ theme }) => theme.red};
  text-decoration: underline;
  &:visited {
    color: ${({ theme }) => theme.red};
  }
`
const MappaContainer = styled.div`
  position: relative;
`

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
`

const BackgroundTop = styled.div`
  flex-grow: 1;
`

const BackgroundBottom = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.yellow};
`

const Mappa = styled(GatsbyImage)`
  margin: 0 24px;
`

function Contatti({ pageContext, data }) {
  const { title, lang, location } = pageContext

  const pageData = data.wpPage.contattiData

  const {
    titolo,
    nome,
    via,
    cap,
    citta,
    pi,
    cf,
    telefono,
    fax,
    email,
    pec,
    linkedin,
    twitter,
  } = pageData.sede

  return (
    <Layout lang={lang} title={title} location={location}>
      <Wrapper>
        <MappaContainer>
          <BackgroundContainer>
            <BackgroundTop />
            <BackgroundBottom />
          </BackgroundContainer>
          <Mappa
            alt="Map of cles position in Rome"
            image={
              data.wpPage.contattiData.mappa.localFile.childImageSharp
                .gatsbyImageData
            }
          />
        </MappaContainer>
        <Container>
          <PageSlice>
            <Title>{titolo[lang]}</Title>

            <Content>
              <Text>
                <strong>{nome}</strong>
              </Text>
              <Text>{via}</Text>
              <Text>
                {cap} {citta}
              </Text>
              <Text>P.I. {pi}</Text>
              <Text>C.F. {cf}</Text>
            </Content>
          </PageSlice>

          <PageSlice>
            <Title>{lang === 'en' ? 'Contacts' : 'Contatti'}</Title>

            <Content>
              <Text>
                <Link href={`tel:${telefono}`}> T.{telefono}</Link>
              </Text>
              <Text>F.{fax}</Text>
              <Text>
                <Link href={`mailto:${email}`}>{email}</Link>
              </Text>
              <Text>
                <Link href={`mailto:${pec}`}>{pec}</Link>
              </Text>
            </Content>
          </PageSlice>

          <PageSlice>
            <Title>Social</Title>

            <Content>
              <Text>
                <SocialLink href={linkedin}>LinkedIn</SocialLink>
              </Text>
              <Text>
                <SocialLink href={twitter}>Twitter</SocialLink>
              </Text>
            </Content>
          </PageSlice>

          <PageSlice>
            <Title>Scrivici</Title>


          </PageSlice>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default Contatti

export const data = graphql`
  query Contatti {
    wpPage(id: { eq: "cG9zdDo2MTM=" }) {
      id
      slug
      title
      contattiData {
        tittolo {
          it
          en
        }
        iuerrelle {
          en
        }
        mappa {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        sede {
          titolo {
            it
            en
          }
          nome
          via
          cap
          citta
          pi
          cf
          telefono
          fax
          email
          pec
          linkedin
          twitter
        }
      }
    }
  }
`
