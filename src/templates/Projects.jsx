import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SchedaProgetto from '../components/SchedaProgetto'

const Container = styled.main`
  margin-top: calc(80px + 15.5vw);
  margin-bottom: 40px;
  display: flex;
  padding: 0 20px;
`

const ProjectList = styled.section``

const SideBar = styled.div``

const Title = styled.h4``

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
