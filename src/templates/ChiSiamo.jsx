import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { departments } from '../const'

import Layout from '../components/Layout'
import PageIntro from '../components/PageIntro/PageIntro'
import PageSection from '../components/PageSection'
import People from '../components/People'
import ScrollSpy from '../components/ScrollSpy'
import useClientRect from '../hooks/useClientRect'
import ActivityItem from '../components/ActivityItem/ActivityItem'

const TextBlock = styled.article`
  margin-top: 40px;
`

const BigText = styled.h4`
  margin-bottom: 56px;

  @media (min-width: 769px) {
    margin-bottom: 80px;
    margin-top: 40px;
  }
`

const ActivityList = styled.article``

export default function ChiSiamo({ pageContext, data: pageData }) {
  const { lang, location } = pageContext

  const { chiSiamoData: data } = pageData.chiSiamoPage

  const [rect, ref] = useClientRect()

  const people = data.persone?.map(p => p.persona) ?? []

  const sections = [
    {
      id: data.cles.fieldGroupName,
      label: data.cles.titolo,
    },
    {
      id: data.storia.fieldGroupName,
      label: data.storia.titolo,
    },
    {
      id: data.servizi.fieldGroupName,
      label: data.servizi.metaTitolo,
    },
    {
      id: data.team.fieldGroupName,
      label: data.team.titolo,
    },
  ]

  return (
    <Layout lang={lang} location={location} title={data.titolo[lang]}>
      <PageIntro
        graphic={pageData.graphic.childImageSharp.gatsbyImageData}
        image={pageData.image.childImageSharp.gatsbyImageData}
        text={data.descrizione[lang]}
      />

      <ScrollSpy
        offset={-800}
        sections={sections}
        firstSectionTop={rect?.y}
        firstOffset={300}
      />

      {/* Cles */}

      <PageSection
        title={data.cles.titolo[lang]}
        id={data.cles.fieldGroupName}
        ref={ref}
      >
        <TextBlock
          dangerouslySetInnerHTML={{ __html: data.cles.anteprima[lang] }}
        />

        <TextBlock
          dangerouslySetInnerHTML={{ __html: data.cles.descrizione[lang] }}
        />
      </PageSection>

      {/* Storia */}

      <PageSection
        title={data.storia.titolo[lang]}
        id={data.storia.fieldGroupName}
        ref={ref}
      >
        <TextBlock
          dangerouslySetInnerHTML={{ __html: data.storia.anteprima[lang] }}
        />

        <TextBlock
          dangerouslySetInnerHTML={{ __html: data.storia.descrizione[lang] }}
        />
      </PageSection>

      {/* Aree Attività */}

      <PageSection
        title={data.servizi.metaTitolo[lang]}
        id={data.servizi.fieldGroupName}
        noCollapse
      >
        <BigText>{data.servizi.titolo[lang]}</BigText>

        <ActivityList>
          {data.servizi.areeAttivit.map((activity, index) => (
            <ActivityItem
              activity={activity}
              index={index}
              key={activity.titolo[lang]}
            />
          ))}
        </ActivityList>
      </PageSection>

      {/* Persone */}
      <div id="team">
        <PageSection title={data.team.titolo[lang]} noCollapse>
          <BigText>{data.team.descrizione[lang]}</BigText>
        </PageSection>
        <People
          departments={departments}
          people={people}
          comitato={data.comitatoScientifico}
        />
      </div>
    </Layout>
  )
}

export const data = graphql`
  query ChiSiamo {
    chiSiamoPage: wpPage(id: { eq: "cG9zdDo0MjY=" }) {
      chiSiamoData {
        titolo {
          it
          en
        }
        descrizione {
          it
          en
        }
        servizi {
          fieldGroupName
          metaTitolo {
            it
            en
          }
          titolo {
            it
            en
          }
          areeAttivit {
            titolo {
              it
              en
            }
          }
        }
        cles {
          fieldGroupName
          titolo {
            it
            en
          }
          anteprima {
            it
            en
          }
          descrizione {
            it
            en
          }
        }
        storia {
          fieldGroupName
          titolo {
            it
            en
          }
          anteprima {
            it
            en
          }
          descrizione {
            it
            en
          }
        }
        team {
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
        comitatoScientifico {
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
        }
        persone {
          persona {
            nomeECognome
            dipartimento
            ruolo {
              it
              en
            }
            foto {
              seria {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 450, layout: FULL_WIDTH)
                  }
                }
              }
              scherzosa {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 450, layout: FULL_WIDTH)
                  }
                }
              }
            }
          }
        }
      }
    }
    image: file(name: { eq: "chi-siamo-photo" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    graphic: file(name: { eq: "chi-siamo-graphic" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
