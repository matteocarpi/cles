import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'

import useResponsiveness from '../hooks/useResponsiveness'

import Layout from '../components/Layout'
import AppearingText from '../components/AppearingText'
import MenuText from '../components/MenuText'

const Container = styled.section`
  margin-top: 124px;
  padding: 20px;

  @media (min-width: 768px) {
    margin-top: 22vw;
    margin-bottom: 90px;
    padding: 0 40px;
  }
`

const Description = styled(motion.h3)``

const Text = styled(AppearingText)`
  width: 100%;
  max-width: 1000px;
  margin-top: 8px;

  @media (min-width: 769px) {
    align-self: flex-start;
    padding: 0;
  }
`

const Image = styled(GatsbyImage)`
  margin: 40px 0;
`

const PremioInfoContainer = styled.article`
  border-top: ${({ theme }) => `solid 2px ${theme.gray}`};
`

const PremioDescription = styled.article``

const BandoContainer = styled.div`
  line-height: 1.5rem;
  font-weight: bold;
`

const DownloadLink = styled.a`
  color: ${({ theme }) => theme.yellow};

  &:visited {
    color: ${({ theme }) => theme.yellow};
  }
`

export default function Policies({ pageContext, data: pageData }) {
  const { lang, location, parentUrl } = pageContext

  const { title } = pageData.wpPage

  const { introText, immagine, infoPremio, bando } =
    pageData.wpPage.paoloLeonData

  const { isMobile } = useResponsiveness()

  return (
    <Layout lang={lang} location={location} title={title} parentUrl={parentUrl}>
      <Container>
        <Text maxStrLength={isMobile ? 25 : 40} component={Description}>
          {introText[lang]}
        </Text>
        <Image image={immagine.localFile.childImageSharp.gatsbyImageData} />

        <PremioInfoContainer>
          <MenuText>{infoPremio.titolo[lang]}</MenuText>

          <PremioDescription
            dangerouslySetInnerHTML={{ __html: infoPremio.descrizione[lang] }}
          />
        </PremioInfoContainer>

        <BandoContainer>
          {bando.titolo[lang]} -{' '}
          <DownloadLink
            href={bando.allegato[lang].mediaItemUrl}
            target="_blank"
            rel="noreferrer"
          >
            {bando.allegato[lang].title}
          </DownloadLink>
        </BandoContainer>
      </Container>
    </Layout>
  )
}

export const data = graphql`
  query PaoloLeon($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      paoloLeonData {
        introText {
          it
          en
        }
        immagine {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        infoPremio {
          titolo {
            it
            en
          }
          descrizione {
            it
            en
          }
        }
        bando {
          titolo {
            it
            en
          }
          allegato {
            it {
              mediaItemUrl
              title
            }
            en {
              mediaItemUrl
              title
            }
          }
        }
      }
    }
  }
`
