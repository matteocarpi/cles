import React, { useState } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { motion } from 'framer-motion'

import ButtonLink from '../ButtonLink'
import MenuText from '../MenuText'
import BoxedImages from '../BoxedImages'
import AppearingText from '../AppearingText'

const HomeSectionWrapper = styled.section`
  padding: 24px;
  @media (min-width: 769px) {
    padding-left: calc(80px + 26vw);
    padding-right: 40px;
  }
`

const HomeSection = styled.section`
  border-top: solid 1px ${({ theme }) => theme.gray};

  @media (min-width: 769px) {
    border: none;
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
  }

  @media (min-width: 1440px) {
    margin-top: 200px;
  }
`

const SectionTitleMobile = styled(MenuText)`
  @media (min-width: 769px) {
    display: none;
  }
`

const AnimatedAreaTitle = styled(AppearingText)``

const AreaTitle = styled(motion.h3)`
  font-style: italic;
  color: ${({ theme }) => theme.red};
  margin: 0;
  padding-right: 18px;
  text-align: right;
  font-size: 28px;
  line-height: 32px;
  white-space: nowrap;
`

const TextContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (min-width: 769px) {
    margin: 55px;
  }
  @media (min-width: 940px) {
    max-width: 300px;
  }
  @media (min-width: 1681px) {
    margin-right: 200px;
  }
`

const AnimatedSubtitle = styled(AppearingText)`
  margin-bottom: 40px;
`
const ServiceSubtitle = styled(motion.h4)`
  margin-bottom: 40px;
`

const ServiceDescription = styled.article``

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;

  @media (min-width: 940px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: stretch;
    width: 70%;
    min-width: 860px;
    margin-right: 0;
  }
`

const ImagesWrapper = styled.section`
  width: 100%;
`

const ImagesContainer = styled.section`
  margin: 0 auto;
  @media (min-width: 769px) {
    width: unset;
  }
`

export default function ServiziHomePreview({ lang, id }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const data = useStaticQuery(graphql`
    query ServiziPreview {
      chiSiamoPage: wpPage(id: { eq: "cG9zdDo3Ng==" }) {
        chiSiamoData {
          servizi {
            titolo {
              it
              en
            }
            descrizione {
              it
              en
            }
            areeAttivit {
              titolo {
                it
                en
              }
              immagine {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 600)
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
      homePage: wpPage(id: { eq: "cG9zdDoyMw==" }) {
        id
        homeData {
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
        }
      }
    }
  `)

  const { areeAttivit } = data.chiSiamoPage.chiSiamoData.servizi

  const aree = areeAttivit.map(area => ({
    ...area,
    titolo: area.titolo[lang],
    immagine: area.immagine.localFile,
  }))

  const images = aree.map(area => area.immagine)

  return (
    <HomeSectionWrapper>
      <HomeSection id={id}>
        <SectionTitleMobile>
          {lang === 'en' ? 'Services' : 'Servizi'}
        </SectionTitleMobile>

        <ContentContainer>
          <TextContainer>
            <AnimatedSubtitle numberOfLines={2} component={ServiceSubtitle}>
              {data.homePage.homeData.services.titolo[lang]}
            </AnimatedSubtitle>

            <ServiceDescription
              dangerouslySetInnerHTML={{
                __html: data.homePage.homeData.services.descrizione[lang],
              }}
            />

            <ButtonLink to="#">
              {lang === 'en' ? 'Continue' : 'Continua'}
            </ButtonLink>
          </TextContainer>

          <ImagesWrapper>
            <ImagesContainer>
              <BoxedImages images={images} setCurrentIndex={setCurrentIndex} />

              {aree.map((_, index) => (
                <>
                  {currentIndex === index && (
                    <AnimatedAreaTitle
                      key={aree[index].titolo}
                      numberOfLines={2}
                      component={AreaTitle}
                    >
                      {aree[currentIndex].titolo}
                    </AnimatedAreaTitle>
                  )}
                </>
              ))}
            </ImagesContainer>
          </ImagesWrapper>
        </ContentContainer>
      </HomeSection>
    </HomeSectionWrapper>
  )
}
