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
import Accordion from '../components/Accordion/Accordion'
import { BandoCategories, BandoTitles } from '../const'
import useLang from '../hooks/useLang'

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
  /* line-height: 1.5rem; */
  /* font-weight: bold; */
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

//Details-Bando-Premio styling

const DetailsContainer = styled.section`
  margin: 20px 0 ;
  border-top: 2px solid ${({ theme }) => theme.gray};
`

const Titolo = styled.h6`
  margin-top: 30px;
  p {
    margin: 20px 0;
    font-weight: 600;
  }
  @media (min-width: 768px) {
    margin-top: 40px;
    margin-bottom: 10px;
  }
`
const Descrizione = styled.h6`
  margin-top: 30px;
  p {
    margin: 0;
    margin: 20px 0;
  }
  @media (min-width: 768px) {
    margin-top: 40px;
    margin-bottom: 10px;
    p {
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
    }
  }
`
const InfoWrapper = styled.article`
  @media (min-width: 768px) {
    display: flex;
  }
`
const InfoHalf = styled.div`
  @media (min-width: 768px) {
    width: 70%;
  }
`

const InfoContainer = styled.article`
  margin-top: 20px;
  &:first-child {
    margin-top: ${({ reduced }) => reduced && '30px'};
  }
  //  width: 50%;
`
const DetailsInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
`
const Label = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
`
const BandoText = styled.div`
  p {
    margin: 0;
    &:not(first-child) {
      margin-bottom: 1rem;
    }
  }

  ul {
    padding-top: 1rem;
    list-style: disc;
    margin-left: 2rem;
  }

  li {
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`
const BandoLink = styled.section`
  margin-top: 60px;
  font-weight: bold;
`

export default function Policies({ pageContext, data: pageData }) {
  const { lang, location, parentUrl } = pageContext

  const { title } = pageData.wpPage

  const {
    introText,
    immagine,
    infoPremio,
    bando,
    economista,
    bandoPremio,
    bandiChiusi,
  } = pageData.wpPage.paoloLeonData

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
            dangerouslySetInnerHTML={{ __html: economista.descrizione[lang] }}
          />
        </PremioInfoContainer>

        <BandoContainer>
          <Accordion
            key={BandoCategories.bando[lang]}
            titolo={BandoCategories.bando}
          >
            <DetailedBandoPremio
              {...bandoPremio}
              lang={lang}
              isMobile={isMobile}
              bando={bando}
            />
          </Accordion>
          <Accordion
            key={BandoCategories.bandi[lang]}
            titolo={BandoCategories.bandi}
          >
            {bandiChiusi?.map((props, index) => {
              return (
                <DetailedBandiChiusi
                  {...props}
                  lang={lang}
                  isMobile={isMobile}
                  key={index}
                />
              )
            })}
          </Accordion>
        </BandoContainer>
      </Container>
    </Layout>
  )
}

const DetailedBandoPremio = ({
  titolo,
  descrizione,
  committente,
  annoDiInizio,
  annoDiFine,
  lang,
  borderTop,
  bando,
}) => (
  <DetailsContainer borderTop={borderTop}>
    <Titolo dangerouslySetInnerHTML={{ __html: titolo[lang] }} />
    <Descrizione dangerouslySetInnerHTML={{ __html: descrizione[lang] }} />

    <InfoWrapper>
      <InfoHalf>
        <DetailsInfo>
          <InfoContainer>
            <Label>{BandoTitles.committente[lang]}</Label>
            <BandoText>{committente}</BandoText>
          </InfoContainer>
          <InfoContainer>
            <Label>{BandoTitles.periodo[lang]}</Label>
            <BandoText>
              {annoDiInizio} - {annoDiFine}
            </BandoText>
          </InfoContainer>
        </DetailsInfo>
      </InfoHalf>
    </InfoWrapper>
    <BandoLink>
      {bando.titolo[lang]} -{' '}
      <DownloadLink
        href={bando.allegato[lang].mediaItemUrl}
        target="_blank"
        rel="noreferrer"
      >
        {bando.allegato[lang].title}
      </DownloadLink>
    </BandoLink>
  </DetailsContainer>
)

const DetailedBandiChiusi = ({
  titolo,
  descrizione,
  annoDiInizio,
  annoDiFine,
  lang,
  borderTop,
  menzione,
  vincitore,
}) => (
  <DetailsContainer borderTop={borderTop}>
    <Titolo dangerouslySetInnerHTML={{ __html: titolo[lang] }} />

    <InfoWrapper>
      <InfoHalf>
        <DetailsInfo>
          <InfoContainer>
            <Label>{BandoTitles.vincitore[lang]}</Label>
            <BandoText>{vincitore[lang]}</BandoText>
          </InfoContainer>
          <InfoContainer>
            <Label>{BandoTitles.menzione[lang]}</Label>
            <BandoText>{menzione[lang]}</BandoText>
          </InfoContainer>
        </DetailsInfo>
      </InfoHalf>
    </InfoWrapper>

    <InfoContainer>
      <Label>{BandoTitles.periodo[lang]}</Label>
      <BandoText>
        {annoDiInizio} - {annoDiFine}
      </BandoText>
    </InfoContainer>

    <Descrizione dangerouslySetInnerHTML={{ __html: descrizione[lang] }} />
  </DetailsContainer>
)

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
        bandoPremio {
          annoDiFine
          annoDiInizio
          committente
          descrizione {
            en
            it
          }
          titolo {
            en
            it
          }
        }
        bandiChiusi {
          titolo {
            en
            it
          }
          descrizione {
            en
            it
          }
          menzione {
            en
            it
          }
          annoDiFine
          annoDiInizio
          vincitore {
            en
            it
          }
        }
      }
    }
  }
`
