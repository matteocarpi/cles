import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageIntro from '../components/PageIntro/PageIntro'
import PageSection from '../components/PageSection'
import PeopleGrid from '../components/People'
import ScrollSpy from '../components/ScrollSpy'
import useClientRect from '../hooks/useClientRect'

const Text = styled.article`
  @media (min-width: 768px) {
    columns: 100px 2;
  }
`

const BigText = styled.h3``

const ActivityList = styled.article``

const Activity = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

const ActivityNumber = styled.h6`
  width: 20px;
  margin-right: 20px;
  text-align: left;
  color: ${({ theme }) => theme.gray};
`

const ActivityName = styled.h6``

const departments = [
  {
    id: 'management',
    title: {
      it: 'Il Management',
      en: 'Management',
    },
  },
  {
    id: 'responsabili_progetto',
    title: {
      it: 'Responsabili di area/progetto',
      en: 'Project/area managers',
    },
  },
  {
    id: 'esperti',
    title: {
      it: 'Esperti junior/senior',
      en: 'Junior/senior experts',
    },
  },
  {
    id: 'staff',
    title: {
      it: 'Staff tecnico e amministrativo',
      en: 'Technical and administrative staff',
    },
  },
  {
    id: 'comitato',
    title: {
      it: 'Il Comitato tecnico',
      en: 'Technical Committee',
    },
  },
]

export default function ChiSiamo({ pageContext, data: pageData }) {
  const { lang } = pageContext

  const { chiSiamoData: data } = pageData.chiSiamoPage

  const [rect, ref] = useClientRect()

  const people = data.persone.map(p => p.persona)

  const sections = [
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
    <Layout lang={lang} title={data.titolo[lang]}>
      <PageIntro
        graphic={pageData.graphic.childImageSharp.gatsbyImageData}
        image={pageData.image.childImageSharp.gatsbyImageData}
        text={data.descrizione[lang]}
      />

      <ScrollSpy offset={-400} sections={sections} firstSectionTop={rect?.y} />

      {/* Storia */}

      <PageSection
        title={data.storia.titolo[lang]}
        id={data.storia.fieldGroupName}
        ref={ref}
      >
        <Text
          dangerouslySetInnerHTML={{ __html: data.storia.descrizione[lang] }}
        />
      </PageSection>

      {/* Aree Attività */}

      <PageSection
        title={data.servizi.metaTitolo[lang]}
        id={data.servizi.fieldGroupName}
      >
        <BigText>{data.servizi.titolo[lang]}</BigText>

        <ActivityList>
          {data.servizi.areeAttivit.map((activity, index) => (
            <Activity key={activity.titolo[lang]}>
              <ActivityNumber>{`${index + 1 < 9 ? 0 : ''}${
                index + 1
              }`}</ActivityNumber>
              <ActivityName>{activity.titolo[lang]}</ActivityName>
            </Activity>
          ))}
        </ActivityList>
      </PageSection>

      {/* Persone */}

      <PageSection title={data.team.titolo[lang]} noCollapse id="team">
        <BigText>{data.team.descrizione[lang]}</BigText>

        <PeopleGrid departments={departments} people={people} />
      </PageSection>
    </Layout>
  )
}

export const data = graphql`
  query ChiSiamo {
    chiSiamoPage: wpPage(id: { eq: "cG9zdDo3Ng==" }) {
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
        storia {
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
                    gatsbyImageData(width: 450)
                  }
                }
              }
              scherzosa {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 450)
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
