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
  width: 100%;

  @media (min-width: 768px) {
    border: none;
  }
`

const SectionTitleMobile = styled(MenuText)`
  @media (min-width: 768px) {
    display: none;
  }
`

const AreaTitle = styled(motion.h3)`
  font-style: italic;
  color: ${({ theme }) => theme.red};
  margin: 0;
  padding-right: 3px;
  text-align: right;
`

export default function ServiziHomePreview({ lang, title, description, id }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const data = useStaticQuery(graphql`
    query ServiziPreview {
      wpPage(id: { eq: "cG9zdDo3Ng==" }) {
        chiSiamoData {
          areeAttivit {
            titolo {
              it
              en
            }
            sottotitolo {
              it
              en
            }
            descrizione {
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
    sottotitolo: area.sottotitolo[lang],
    descrizione: area.descrizione[lang],
    immagine: area.immagine.localFile,
  }))

  const images = aree.map(area => area.immagine)

  return (
    <HomeSectionWrapper>
      <HomeSection id={id}>
        <SectionTitleMobile>
          {lang === 'en' ? 'Services' : 'Servizi'}
        </SectionTitleMobile>

        <h3>{title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />

        <ButtonLink to="#">
          {lang === 'en' ? 'Continue' : 'Continua'}
        </ButtonLink>

        <BoxedImages images={images} setCurrentIndex={setCurrentIndex} />

        {aree.map((titolo, index) => (
          <>
            {currentIndex === index && (
              <AppearingText
                key={aree[index].titolo}
                numberOfLines={2}
                component={AreaTitle}
              >
                {aree[currentIndex].titolo}
              </AppearingText>
            )}
          </>
        ))}
      </HomeSection>
    </HomeSectionWrapper>
  )
}
