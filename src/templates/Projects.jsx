import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import useLang from '../hooks/useLang'

import Layout from '../components/Layout'
import SchedaProgetto from '../components/SchedaProgetto'
import ArrowLeft from '../assets/arrow-left.svg'

const Container = styled.main`
  margin-top: calc(80px + 15.5vw);
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`

const ProjectList = styled.section``

const SideBar = styled.div``

const Title = styled.h4``

const BackToList = styled(Link)`
  align-self: flex-end;
  margin-top: 40px;

  color: ${({ theme }) => theme.yellow};

  display: flex;
  align-items: center;

  *:first-child {
    margin-right: 10px;
  }

  *:last-child {
    margin-left: 10px;
  }

  &:visited {
    color: ${({ theme }) => theme.yellow};
  }
`

function Projects({ pageContext, data }) {
  const projectList = useMemo(
    () =>
      data.allWpProgetto.edges.map(p => ({
        id: p.node.id,
        ...p.node.progettoData,
      })),
    [data],
  )

  return (
    <Layout
      lang={pageContext.lang}
      title={pageContext.data}
      location={pageContext.location}
    >
      <Container>
        <ProjectList>
          {projectList.map(project => (
            <SchedaProgetto key={project.title} {...project} />
          ))}
        </ProjectList>

        <BackToList to="#">
          <ArrowLeft />

          <h5>
            {pageContext.lang === 'en'
              ? 'Back to the list'
              : 'Torna alla lista'}
          </h5>
        </BackToList>
      </Container>
    </Layout>
  )
}

export const data = graphql`
  query Progetti($status: String, $area: [String] = "") {
    allWpProgetto(
      filter: {
        progettoData: {
          statoProgetto: { eq: $status }
          paroleChiave: { in: $area }
        }
      }
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
export default Projects
