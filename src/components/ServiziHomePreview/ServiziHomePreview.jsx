import React, { useState } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { motion } from 'framer-motion'

import ButtonLink from '../ButtonLink'
import MenuText from '../MenuText'
import BoxedImages from '../BoxedImages'
import AppearingText from '../AppearingText'

const HomeSectionWrapper = styled.section`
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 60px;
`

const HomeSection = styled.section`
  border-top: solid 1px ${({ theme }) => theme.gray};
  /* width: 100%; */

  @media (min-width: 768px) {
    border: none;
    margin-top: 200px;
    padding: 0 40px;
    display: flex;
    justify-content: flex-end;
  }
`

const SectionTitleMobile = styled(MenuText)`
  @media (min-width: 768px) {
    display: none;
  }
`

const AnimatedAreaTitle = styled(AppearingText)``

const AreaTitle = styled(motion.h3)`
  font-style: italic;
  color: ${({ theme }) => theme.red};
  margin: 0;
  padding-right: 3px;
  text-align: right;
  font-size: 28px;
  line-height: 32px;
`

const TextContainer = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  transform: translateX(-19px);
  @media (min-width: 768px) {
    margin: 55px;
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

const ImagesContainer = styled.section`
  width: 100%;
  @media (min-width: 768px) {
    margin: 0 40px;
  }
`

export default function ServiziHomePreview({ lang, id }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const data = useStaticQuery(graphql`
    query ServiziPreview {
      wpPage(id: { eq: "cG9zdDo3Ng==" }) {
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
  `)

  const { areeAttivit } = data.wpPage.chiSiamoData

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
              {data.wpPage.chiSiamoData.servizi.titolo[lang]}
            </AnimatedSubtitle>

            <ServiceDescription
              dangerouslySetInnerHTML={{
                __html: data.wpPage.chiSiamoData.servizi.descrizione[lang],
              }}
            />

            <ButtonLink to="#">
              {lang === 'en' ? 'Continue' : 'Continua'}
            </ButtonLink>
          </TextContainer>

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
        </ContentContainer>
      </HomeSection>
    </HomeSectionWrapper>
  )
}
