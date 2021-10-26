import React, { useMemo, useState } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { paroleChiave } from '../const'
import { searchMultiFields } from '../utils'

import Layout from '../components/Layout'
import SchedaProgetto from '../components/SchedaProgetto'
import ArrowLeft from '../assets/arrow-left.svg'
import useResponsiveness from '../hooks/useResponsiveness'
import KeyWordNavigation from '../components/KeyWordNavigation'
import SearchBox from '../components/SearchBox'
import Loading from '../components/Loading/Loading'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 90px;
  margin-top: calc(80px + 15.5vw);
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 40px;
  }
`

const Sidebar = styled.div`
  position: sticky;
  top: calc(80px + 15.5vw);
`

const Container = styled.main`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    width: calc(100% - 80px - 26vw);
  }
`

const PageTitle = styled.h4`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`

const ProjectList = styled.section``

const Title = styled.h4`
  color: ${({ theme }) => theme.red};

  @media (min-width: 768px) {
    display: none;
  }
`

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

const Tools = styled.div``

function Projects({ pageContext, data }) {
  const [searchQuery, setSearchQuery] = useState()
  const [loading, setLoading] = useState(true)

  const { area, lang, status } = pageContext

  const { isMobile } = useResponsiveness()

  const projectList = useMemo(
    () =>
      data.allWpProgetto.edges
        .map(p => ({
          id: p.node.id,
          ...p.node.progettoData,
        }))
        .filter(project =>
          searchMultiFields(
            [
              project.titolo[lang],
              project.committente,
              project.ruolo[lang],
              project.serviziEAttivit[lang],
              project.annoDiInizio,
              project.annoDiFine,
            ],
            searchQuery,
          ),
        ),
    [data.allWpProgetto.edges, lang, searchQuery],
  )

  return (
    <Layout
      lang={pageContext.lang}
      title={pageContext.title}
      location={pageContext.location}
    >
      <Wrapper>
        <Sidebar>
          <PageTitle>{pageContext.title}</PageTitle>

          {!isMobile && status === 'aperto' && (
            <Tools>
              <SearchBox
                setValue={setSearchQuery}
                setLoading={setLoading}
                value={searchQuery}
              />
              <KeyWordNavigation />
            </Tools>
          )}
        </Sidebar>
        <Container>
          {typeof area === 'string' && (
            <Title>#{paroleChiave[area][lang]}</Title>
          )}
          {/* eslint-disable-next-line no-nested-ternary */}
          {loading ? (
            <Loading />
          ) : projectList.length ? (
            <ProjectList>
              {projectList.map(project => (
                <SchedaProgetto key={project.titolo[lang]} {...project} />
              ))}
            </ProjectList>
          ) : (
            <div>Nessun Progetto...</div>
          )}
        </Container>
      </Wrapper>
      {status === 'aperto' && (
        <BackToList
          to={
            pageContext.lang === 'en'
              ? '/services/#progetti'
              : '/servizi/#progetti'
          }
        >
          <ArrowLeft />

          <h5>
            {pageContext.lang === 'en'
              ? 'Back to the list'
              : 'Torna alla lista'}
          </h5>
        </BackToList>
      )}
    </Layout>
  )
}

export const data = graphql`
  query Progetti(
    $status: String
    $area: [String] = ""
    $startYear: Float = 0
    $endYear: Float = 0
  ) {
    allWpProgetto(
      filter: {
        progettoData: {
          statoProgetto: { eq: $status }
          paroleChiave: { in: $area }
          annoDiFine: { gte: $startYear, lt: $endYear }
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
