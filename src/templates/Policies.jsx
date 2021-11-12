import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import MenuText from '../components/MenuText'

const Container = styled.main`
  margin-top: 124px;
  padding: 0 20px;

  @media (min-width: 769px) {
    margin-top: calc(22vw + 20px);
    margin-bottom: 90px;
    padding: 0 40px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const Title = styled(MenuText)`
  margin-top: 0;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 32px;
    text-transform: none;

    position: sticky;
    top: calc(22vw + 20px);
  }
`

const Content = styled.article`
  max-width: 960px;
`

export default function Policies({ pageContext, data: pageData }) {
  const { lang, location, parentUrl } = pageContext

  const { policiesData: data } = pageData.wpPage

  const { title } = pageData.wpPage
  const { contenuto } = data

  return (
    <Layout
      lang={lang}
      location={location}
      title={title}
      parentUrl={parentUrl}
      noFooter
    >
      <Container>
        <Title>{title}</Title>
        <Content dangerouslySetInnerHTML={{ __html: contenuto[lang] }} />
      </Container>
    </Layout>
  )
}

export const data = graphql`
  query Policies($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      policiesData {
        contenuto {
          it
          en
        }
      }
    }
  }
`
