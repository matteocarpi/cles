import React, { useEffect, useMemo, useState } from 'react'
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
import PageNavigation from '../components/PageNavigation'

const Wrapper = styled.div`
  align-items: flex-start;
  justify-content: space-between;
  margin-top: calc(130px + 15.5vw);
  padding: 0 20px;

  @media (min-width: 768px) {
    margin-bottom: 50px;
    padding: 0 40px;
    display: flex;
  }
`

const Sidebar = styled.div`
  top: calc(80px + 15.5vw);
  @media (min-width: 768px) {
    position: sticky;
    width: 25%;
  }
`

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    margin-top: -40px;
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
  margin-top: 30px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.red};

  @media (min-width: 768px) {
    display: none;
  }
`

const BackToList = styled(Link)`
  align-self: flex-end;

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

  svg {
    width: 30px;
    height: 30px;
  }

  @media (min-width: 768px) {
    margin-top: 20px;
    margin-top: 0;
  }
`

const Tools = styled.div``

const BottomNavigation = styled.section`
  padding: 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  @media (min-width: 768px) {
    margin-bottom: 90px;
    flex-direction: row;
    align-items: center;
    padding: 0 40px;
  }
`

function Projects({ pageContext, data }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const { area, lang, status, endYear, parentUrl } = pageContext

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

  const numPerPage = 10

  const pages = useMemo(() => {
    const numPages = Math.ceil(projectList.length / numPerPage)
    return Array.from(Array(numPages).keys())
  }, [projectList.length])

  const paginatedProjects = useMemo(() => {
    const projectPages = pages.map((page, index) => {
      const start = page * numPerPage
      const end = start + numPerPage

      return projectList.slice(start, end)
    })
    return projectPages
  }, [pages, projectList])

  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [currentPage])
  
  return (
    <Layout
      lang={pageContext.lang}
      title={pageContext.title}
      location={pageContext.location}
      parentUrl={parentUrl}
    >
      <Wrapper>
        <Sidebar>
          <PageTitle>{pageContext.title}</PageTitle>

          <Tools>
            <SearchBox
              setValue={setSearchQuery}
              setLoading={setLoading}
              value={searchQuery}
            />
            {!isMobile && endYear > 2014 && (
              <KeyWordNavigation status={status} />
            )}
          </Tools>
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
              {paginatedProjects[currentPage].map(project => (
                <SchedaProgetto key={project.titolo[lang]} {...project} />
              ))}
            </ProjectList>
          ) : (
            <div>Nessun Progetto...</div>
          )}
        </Container>
      </Wrapper>
      <BottomNavigation>
        {isMobile && status === 'aperto' && (
          <KeyWordNavigation status={status} />
        )}
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
        <PageNavigation
          pages={pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </BottomNavigation>
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
      sort: {order: DESC, fields: date}
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
            pdf {
              localFile {
                url
              }
            }
          }
        }
      }
    }
  }
`
export default Projects
