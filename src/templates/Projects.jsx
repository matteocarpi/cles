import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SchedaProgetto from '../components/SchedaProgetto'

const Container = styled.main`
  margin-top: calc(80px + 15.5vw);
  display: flex;
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
          areeDiLavoro: { in: $area }
        }
      }
    ) {
      edges {
        node {
          id
          progettoData {
            annoDiFine
            annoDiInizio
            areeDiLavoro
            committente
            statoProgetto
            titolo {
              it
              en
            }
            serviziOfferti {
              it
              en
            }
          }
        }
      }
    }
  }
`
export default Projects
