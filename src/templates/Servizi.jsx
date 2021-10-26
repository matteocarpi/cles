import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import useClientRect from '../hooks/useClientRect'

import Layout from '../components/Layout'
import PageIntro from '../components/PageIntro'
import PageSection from '../components/PageSection'
import ServiceAreaAccordion from '../components/ServiceAreaAccordion/ServiceAreaAccordion'
import { projectCategories } from '../const'
import Accordion from '../components/Accordion/Accordion'
import SchedaProgetto from '../components/SchedaProgetto/SchedaProgetto'
import ReadMoreLink from '../components/ReadMoreLink'
import ScrollSpy from '../components/ScrollSpy'

const Text = styled.h4``

const RestrictedText = styled.h4`
  @media (min-width: 768px) {
    width: calc(100% - 80px - 26vw);
    margin-left: auto;
  }
`

const Areas = styled.section`
  margin-top: 60px;
  margin-bottom: 40px;
`

const Projects = styled.section`
  margin-top: 60px;
  margin-bottom: 40px;
`

const ClosedProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`

const ClosedProjectsLink = styled(Link)`
  border-top: 1px solid ${({ theme }) => theme.gray};
  padding: 20px 0;

  &:last-child {
    padding-bottom: 0;
  }
`

export default function Servizi({ pageContext, data: pageData }) {
  const [rect, ref] = useClientRect()

  const [expandedArea, setExpandedArea] = useState(null)

  const { lang, location } = pageContext
  const { serviziData: data } = pageData.serviziPage

  const sections = [
    {
      id: data.servizi.fieldGroupName,
      label: data.servizi.titolo,
    },
    {
      id: data.progetti.fieldGroupName,
      label: data.progetti.titolo,
    },
  ]

  return (
    <Layout lang={lang} location={location} title={data.titolo[lang]}>
      <PageIntro
        graphic={pageData.graphic.childImageSharp.gatsbyImageData}
        image={pageData.image.childImageSharp.gatsbyImageData}
        text={data.intro[lang]}
        reverseImages
      />

      <ScrollSpy offset={-600} sections={sections} firstSectionTop={rect?.y} />

      {/* Servizi */}

      <PageSection
        title={data.servizi.titolo[lang]}
        id={data.servizi.fieldGroupName}
        ref={ref}
        noCollapse
        noSeparatorDesktop
        fullWidth
      >
        <RestrictedText>{data.servizi.descrizione[lang]}</RestrictedText>

        <Areas>
          {data.servizi.areeDiServizio.map(area => (
            <ServiceAreaAccordion
              {...area}
              key={area.titolo[lang]}
              expandedArea={expandedArea}
              setExpandedArea={setExpandedArea}
            />
          ))}
        </Areas>
      </PageSection>

      {/* Progetti */}

      <PageSection
        title={data.progetti.titolo[lang]}
        id={data.progetti.fieldGroupName}
        ref={ref}
        noCollapse
        noSeparator
      >
        <Text>{data.progetti.descrizione[lang]}</Text>

        <Projects>
          <Accordion
            key={projectCategories.aperti[lang]}
            titolo={projectCategories.aperti}
          >
            {pageData.progettiAperti.edges.map(({ node: progetto }) => (
              <SchedaProgetto key={progetto.id} {...progetto.progettoData} />
            ))}
            <ReadMoreLink
              to={lang === 'en' ? '/ongoing-projects' : '/progetti-in-corso'}
            />
          </Accordion>

          <Accordion
            key={projectCategories.chiusi[lang]}
            titolo={projectCategories.chiusi}
          >
            <ClosedProjectsContainer>
              <ClosedProjectsLink
                to={
                  lang === 'en'
                    ? '/closed-projects-after-2015'
                    : '/progetti-chiusi-dopo-il-2015'
                }
              >
                <h5>{projectCategories.chiusi.dopoIl2015[lang]}</h5>
              </ClosedProjectsLink>

              <ClosedProjectsLink
                to={
                  lang === 'en'
                    ? '/closed-projects-before-2015'
                    : '/progetti-chiusi-prima-del-2015'
                }
              >
                <h5>{projectCategories.chiusi.primaDel2015[lang]}</h5>
              </ClosedProjectsLink>
            </ClosedProjectsContainer>
          </Accordion>
        </Projects>
      </PageSection>
    </Layout>
  )
}

export const data = graphql`
  query Servizi {
    serviziPage: wpPage(id: { eq: "cG9zdDo0NDg=" }) {
      serviziData: serviciosData {
        titolo: totolo {
          it
          en
        }
        intro {
          it
          en
        }
        servizi: servicios {
          fieldGroupName
          titolo: tuttolo {
            it
            en
          }
          descrizione {
            it
            en
          }
          areeDiServizio {
            titolo {
              it
              en
            }
            immagine {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 400)
                }
              }
            }
            descrizione {
              it
              en
            }
            listaServizi {
              it
              en
            }
          }
        }
        progetti {
          fieldGroupName
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
    image: file(name: { eq: "servizi-photo" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    graphic: file(name: { eq: "servizi-graphic" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    progettiAperti: allWpProgetto(
      filter: { progettoData: { statoProgetto: { eq: "aperto" } } }
      limit: 3
      sort: { order: DESC, fields: progettoData___annoDiFine }
    ) {
      edges {
        node {
          id
          progettoData {
            titolo {
              it
              en
            }
            committente
            ruolo {
              it
              en
            }
            annoDiInizio
            annoDiFine
            serviziEAttivit {
              it
              en
            }
            paroleChiave
            statoProgetto
          }
        }
      }
    }
  }
`
