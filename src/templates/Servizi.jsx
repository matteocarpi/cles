import React, { useState, useEffect, useMemo } from 'react'
import { graphql, Link, navigate } from 'gatsby'
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
import MaskedImage from '../components/MaskedImage'

const Services = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 60px;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 90px;
  }
`

const Sidebar = styled.div`
  margin-bottom: 40px;

  @media (min-width: 768px) {
    position: sticky;
    top: calc(15.5vw + 70px);
    width: 300px;
    height: 400px;
    margin-bottom: 0;
  }
`

const ServicesMain = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: calc(100% - 80px - 26vw);
  }
`

const Text = styled.h4``

const Areas = styled.section`
  margin-top: 50px;

  @media (min-width: 768px) {
    margin-top: 90px;
    margin-bottom: 0;
  }
`

const Projects = styled.section`
  margin-top: 50px;
  margin-bottom: 60px;

  @media (min-width: 768px) {
    margin-bottom: 90px;
  }
`

const ClosedProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`

const ClosedProjectsLink = styled(Link)`
  border-top: 1px solid ${({ theme }) => theme.gray};
  padding: 15px 0;

  &:last-child {
    padding-bottom: 0;
    margin-bottom: -5px;
  }

  @media (min-width: 768px) {
    padding: 20px 0;
  }
`

const StyledReadMoreLink = styled(ReadMoreLink)`
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 10px;
  }
`

export default function Servizi({ pageContext, data: pageData }) {
  const [currImage, setCurrImage] = useState(0)
  const [rect, ref] = useClientRect()

  const [expandedArea, setExpandedArea] = useState(null)

  const { lang, location, parentUrl } = pageContext
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

  const gallery = useMemo(
    () =>
      data.servizi.gallery.map(
        img => img.localFile.childImageSharp.gatsbyImageData,
      ),
    [data.servizi.gallery],
  )

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrImage(currImg =>
          currImg === gallery.length - 1 ? 0 : currImg + 1,
        ),
      3500,
    )

    return () => clearInterval(interval)
  }, [gallery.length, setCurrImage])

  return (
    <Layout
      lang={lang}
      location={location}
      title={data.titolo[lang]}
      parentUrl={parentUrl}
      disableHeadroom
    >
      <PageIntro
        graphic={pageData.graphic.childImageSharp.gatsbyImageData}
        image={pageData.image.childImageSharp.gatsbyImageData}
        text={data.intro[lang]}
        reverseImages
        leftTranslate={10}
        verticalAlignment="flex-start"
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
        <Services>
          <Sidebar>
            <MaskedImage image={gallery[currImage]} />
          </Sidebar>
          <ServicesMain>
            <Text>{data.servizi.descrizione[lang]}</Text>

            <Areas>
              {data.servizi.areeDiServizio.map(area => (
                <ServiceAreaAccordion
                  {...area}
                  id={area.titolo[lang]?.replaceAll(' ', '-')}
                  key={area.titolo[lang]}
                  expandedArea={expandedArea}
                  setExpandedArea={a => {
                    navigate(`#${area.titolo[lang].replaceAll(' ', '-')}`)
                    setExpandedArea(a)
                  }}
                />
              ))}
            </Areas>
          </ServicesMain>
        </Services>
      </PageSection>

      {/* Progetti */}

      <PageSection
        title={data.progetti.titolo[lang]}
        id={data.progetti.fieldGroupName}
        ref={ref}
        noCollapse
        noSeparator
        style={{ marginTop: '-30px' }}
      >
        <Text>{data.progetti.descrizione[lang]}</Text>

        <Projects>
          <Accordion
            key={projectCategories.aperti[lang]}
            titolo={projectCategories.aperti}
          >
            {pageData.progettiAperti.edges.map(({ node: progetto }) => (
              <SchedaProgetto
                key={progetto.id}
                {...progetto.progettoData}
                borderTop
              />
            ))}
            <StyledReadMoreLink
              to={lang === 'en' ? '/ongoing-projects' : '/progetti-in-corso'}
            />
          </Accordion>

          <Accordion
            key={projectCategories.chiusi[lang]}
            titolo={projectCategories.chiusi}
            withBottom
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
          gallery {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 400, aspectRatio: 0.8)
              }
            }
          }
          areeDiServizio {
            titolo {
              it
              en
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
        gatsbyImageData(height: 10000)
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
