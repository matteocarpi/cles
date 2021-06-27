import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import navigation from '../../data/navigation.json'

import Logo from '../Logo'
import LogoWord from '../LogoWord'
import MenuText from '../MenuText'

const Container = styled.footer`
  position: relative;
  height: 100vh;
  background-color: ${({ theme }) => theme.black};
  padding: 40px 20px 10px 20px;

  @media (min-width: 768px) {
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const LogoMobile = styled(Logo)`
  width: 100%;
  height: 60px;
  margin: 0 auto;

  @media (min-width: 1110px) {
    display: none;
  }
`

const LogoDesktop = styled(LogoWord)`
  height: 180px;
  min-height: 180px;
  padding-left: 360px;
  display: none;
  @media (min-width: 1110px) {
    display: block;
  }
`

const Document = styled.a`
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

  @media (min-width: 768px) {
    position: relative;
  }
`

const Content = styled.div`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 56px;
  color: ${({ theme }) => theme.white};
  margin-top: 40px;

  a {
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }

  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 100%;
  }
`

const Column = styled.div`
  &:not(:first-child) {
    margin-top: 24px;
  }

  @media (min-width: 768px) {
    width: 30%;
    &:not(:first-child) {
      margin-top: 0;
    }
  }
`
const Navigation = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const NavItem = styled(MenuText)`
  margin: 0;
  color: ${({ theme }) => theme.yellow};
  line-height: 24px;
`

const Contacts = styled.div``

const Quality = styled.div``

const Links = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`

const SecondaryLink = styled(Link)`
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: underline !important;
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
      <LogoDesktop />
      <LogoMobile />
      <Content>
        <Column>
          <Navigation>
            {navigation.pages.map(page => (
              <Link to={page.url[lang]}>
                <NavItem>{page.label[lang]}</NavItem>
              </Link>
            ))}
          </Navigation>
        </Column>
        <Column>
          <Contacts>
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
          </Contacts>
        </Column>

        <Column>
          <Quality>
            <strong>Qualità</strong>
            <br />
            <Document href="#">
              {lang === 'it'
                ? 'Certificazioni ISO 9001'
                : 'ISO Certification 9001'}
            </Document>
            <br />
            <Document href="#">
              {lang === 'it' ? 'Codice Etico' : 'Ethical Code'}
            </Document>
          </Quality>

          <Links>
            <SecondaryLink to="#">Privacy Policy</SecondaryLink>
            <SecondaryLink to="#">Cookie Policy</SecondaryLink>
          </Links>
        </Column>
      </Content>
      <Copyright>{contatti.copyright[lang]}</Copyright>
    </Container>
  )
}
