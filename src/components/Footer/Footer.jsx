import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import navigation from '../../data/navigation.json'
import useLang from '../../hooks/useLang'

import Logo from '../Logo'
import LogoWord from '../LogoWord'
import MenuText from '../MenuText'

const Container = styled.footer`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.black};
  padding: 40px 20px 10px 20px;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;

  a {
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }

  @media (min-width: 1100px) {
    display: grid;
    padding-left: 40px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 0.2fr;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 600px;
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
  display: none;
  grid-column: 2/4;
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
  width: 100%;

  @media (min-width: 1100px) {
    position: relative;
    text-align: left;
    grid-column: 2/4;
  }
`

const Column = styled.div`
  &:not(:first-child) {
    margin-top: 24px;
  }

  @media (min-width: 769px) {
    &:not(:first-child) {
      margin-top: 0;
    }
  }
`
const Navigation = styled.nav`
  display: none;
  @media (min-width: 1100px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
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

export default function Footer() {
  const { lang } = useLang()

  const data = useStaticQuery(graphql`
    query FooterQuery {
      wpPage(id: { eq: "cG9zdDoxNjI=" }) {
        homeData {
          contatti {
            nome
            indirizzo
            cap
            citta
            telefono
            fax
            email
            pec
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
          <br />
          <a href={`mailto:${contatti.pec}`}>{contatti.pec}</a>
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

      <Copyright>{contatti.copyright[lang]}</Copyright>
    </Container>
  )
}
