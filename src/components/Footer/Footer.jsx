import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Logo from '../Logo'

const Container = styled.footer`
  position: relative;
  height: 100vh;
  background-color: ${({ theme }) => theme.black};
  padding: 40px 20px 10px 20px;
`

const StyledLogo = styled(Logo)`
  width: 100%;
  height: 60px;
  margin: 0 auto;
`

const Content = styled.p`
  color: ${({ theme }) => theme.white};
  margin-top: 40px;


  a {
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }
`

const Document = styled.a`
  font-weight: 600;
  text-decoration: underline !important;
`

const Copyright = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.white};
  width: 100vw;
  text-align: center;
  padding-bottom: 1rem;
  font-weight: 100;
`

export default function Footer({ lang }) {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      wpPage(id: { eq: "cG9zdDoyMw==" }) {
        homeData {
          contatti {
            nome
            indirizzo
            cap
            citta
            telefono
            fax
            email
            copyright {
              it
              en
            }
          }
        }
      }
    }
  `)

  const { contatti } = data.wpPage.homeData

  return (
    <Container>
      <StyledLogo />
      <Content>
        <strong>{contatti.nome}</strong>
        <br />
        Via Costanza Baudana Vaccolini n. 14
        <br />
        00153 Roma
        <br />
        <br />
        T.
        <a href={`tel:${contatti.telefono}`}>{contatti.telefono}</a>
        <br />
        F. {contatti.fax}
        <br />
        <a href={`mailto:${contatti.email}`}>{contatti.email}</a>
        <br />
        <br />
        <strong>Qualità</strong>
        <br />
        <Document href="#">
          {lang === 'it' ? 'Certificazioni ISO 9001' : 'ISO Certification 9001'}
        </Document>
        <br />
        <Document href="#">
          {lang === 'it' ? 'Codice Etico' : 'Ethical Code'}
        </Document>
      </Content>
      <Copyright>{contatti.copyright[lang]}</Copyright>
    </Container>
  )
}
