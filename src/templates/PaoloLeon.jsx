import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'

import useResponsiveness from '../hooks/useResponsiveness'
import useClientRect from '../hooks/useClientRect'

import Layout from '../components/Layout'
import AppearingText from '../components/AppearingText'
import MenuText from '../components/MenuText'
import ScrollSpy from '../components/ScrollSpy'

const Container = styled.section`
  width: 100%;
  margin-top: 124px;
  padding: 20px;

  @media (min-width: 768px) {
    margin-top: calc(22vw + 30px);
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

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const Image = styled(GatsbyImage)`
  margin: 40px 0;
  height: 170px;

  @media (min-width: 768px) {
    margin: 90px 0;
    height: 615px;
  }
`

const PremioInfoContainer = styled.article`
  width: 100%;
  border-top: ${({ theme }) => `solid 2px ${theme.gray}`};

  @media (min-width: 768px) {
    border: none;
    margin-bottom: 90px;
  }
`

const PremioTitle = styled(MenuText)`
  margin-top: 30px;

  @media (min-width: 768px) {
    display: none;
  }
`

const PremioDescription = styled.article`
  max-width: 900px;
  margin-left: auto;

  @media (min-width: 768px) {
    column-count: 2;
    column-gap: 40px;
    p {
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    border-bottom: ${({ theme, border }) =>
      border && `solid 2px ${theme.gray}`};
    padding-bottom: ${({ border }) => border && `60px`};
  }
`

const BandoContainer = styled.div`
  line-height: 1.5rem;
  font-weight: bold;
  width: 100%;
  max-width: 900px;
  margin-left: auto;

  @media (min-width: 768px) {
    margin-top: 90px;
  }
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

  const { introText, immagine, infoPremio, bando, economista } =
    pageData.wpPage.paoloLeonData

  const { isMobile } = useResponsiveness()
  const [rect, ref] = useClientRect()

  const sections = [
    {
      id: economista.titolo[lang].replaceAll(' ', ''),
      label: economista.titolo,
    },
    {
      id: infoPremio.titolo[lang].replaceAll(' ', ''),
      label: infoPremio.titolo,
    },
  ]

  return (
    <Layout lang={lang} location={location} title={title} parentUrl={parentUrl}>
      <ScrollSpy
        offset={-800}
        sections={sections}
        firstSectionTop={rect?.y}
        firstOffset={400}
      />

      <Container>
        <Text maxStrLength={isMobile ? 25 : 40} component={Description}>
          {introText[lang]}
        </Text>

        <ImageContainer>
          <Image image={immagine.localFile.childImageSharp.gatsbyImageData} />
        </ImageContainer>

        <PremioInfoContainer
          ref={ref}
          id={economista.titolo[lang].replaceAll(' ', '')}
        >
          <PremioTitle>{economista.titolo[lang]}</PremioTitle>

          <PremioDescription
            border
            dangerouslySetInnerHTML={{ __html: economista.descrizione[lang] }}
          />
        </PremioInfoContainer>

        <PremioInfoContainer
          ref={ref}
          id={infoPremio.titolo[lang].replaceAll(' ', '')}
        >
          <PremioTitle>{infoPremio.titolo[lang]}</PremioTitle>

          <PremioDescription
            dangerouslySetInnerHTML={{ __html: infoPremio.descrizione[lang] }}
          />

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
        </PremioInfoContainer>
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
        economista {
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
