import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { motion } from 'framer-motion'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

import useClientRect from '../../hooks/useClientRect'

import ArrowDown from '../../assets/arrow-down.svg'
import Layout from '../Layout'
import SmallText from '../SmallText'
import AppearingText from '../AppearingText'
import ButtonLink from '../ButtonLink'
import ServiziHomePreview from '../ServiziHomePreview'
import ArrowRight from '../Arrow'
import NewsList from '../NewsList'
import SectionTitleMobile from '../SectionTitleMobile'
import ScrollSpy from '../ScrollSpy'
import LiftedLink from '../LiftedLink/LiftedLink'
import ParallaxImage from '../ParallaxImage'

const IntroWrapper = styled.section`
  width: 100%;
  height: 100vh;
  min-height: 800px;
`

const IntroContainer = styled(BackgroundImage)`
  width: 100%;
  height: calc(100vh - 100px);
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 74px;

  @media (min-width: 769px) {
    min-height: 800px;
  }
`

const Slogan = styled(motion.h2)`
  text-align: center;
  color: ${({ theme }) => theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const SloganText = styled(AppearingText)``

const ScrollDown = styled(AnchorLink)`
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transform: translateY(74px);

  span {
    color: ${({ theme }) => theme.white};
  }
`

const Arrow = styled(ArrowDown)`
  margin-top: 1rem;
`

const HomeSectionWrapper = styled.section`
  width: 100%;
  padding: 24px;
  padding-bottom: 60px;

  ${({ dark, theme }) =>
    dark &&
    css`
      background-color: ${theme.black};
      border-bottom: solid 2px ${theme.yellow};
      color: ${theme.white};
      ${HomeSection} {
        border-top: solid 2px ${theme.yellow};
      }
    `}
  @media (min-width: 769px) {
    ${({ dark, theme }) =>
      dark &&
      css`
        ${Bio} {
          color: ${theme.yellow};
        }
        ${HomeSection} {
          border-top: none;
        }
      `}
    padding-left: calc(80px + 26vw);
    padding-right: 40px;
  }
`

const HomeSection = styled.section`
  border-top: solid 1px ${({ theme }) => theme.gray};
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  @media (min-width: 769px) {
    border: none;
    padding: 0;
    margin-top: 60px;
  }

  @media (min-width: 1440px) {
    margin-top: 200px;
  }
`

const Bio = styled(motion.h3)``

const ClientList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 56px;
`

const SeeAllClients = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  h5 {
    color: ${({ theme }) => theme.yellow};
    margin-right: 1rem;
    white-space: nowrap;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-left: auto;
`

const SectionTitleDesktop = styled.h2`
  ${({ light, theme }) =>
    light &&
    css`
      color: ${theme.white};
    `}
`

const StyledArrowRight = styled(ArrowRight)`
  max-width: 30px;

  @media (min-width: 769px) {
    max-width: 50px;
  }
`

const AppearingSectionSubtitle = styled(AppearingText)`
  margin-bottom: 40px;
`

const sections = [
  {
    id: 'about',
    label: {
      en: 'About',
      it: 'Chi Siamo',
    },
  },
  {
    id: 'services',
    label: {
      en: 'Services',
      it: 'Servizi',
    },
  },
  {
    id: 'clients',
    label: {
      en: 'Clients',
      it: 'Clienti',
    },
  },
  {
    id: 'news',
    label: {
      en: 'News',
      it: 'News',
    },
    isLight: true,
  },
]

export default function Home({ lang, location, data }) {
  const [rect, ref] = useClientRect()

  const { homeData } = data.homePage

  const clients = data.clientiPage.clientiData.clienti

  const news = data.allWpPost.edges.map(n =>
    lang === 'it' || !n.node.newsData.tradotta
      ? n.node
      : {
          ...n.node,
          title: n.node.newsData[lang].titolo,
          excerpt: n.node.newsData[lang].contenuto.substring(0, 200),
        },
  )

  return (
    <Layout
      location={location}
      lang={lang}
      title={data.homePage.homeData.title[lang]}
    >
      <IntroWrapper>
        <IntroContainer
          fluid={homeData.immagine.localFile.childImageSharp.fluid}
        >
          <SloganText numberOfLines={2} component={Slogan}>
            {homeData.slogan[lang]}
          </SloganText>
          <ScrollDown to={lang === 'en' ? '/en#about' : '#about'}>
            <SmallText>Scroll Down</SmallText>
            <Arrow />
          </ScrollDown>
        </IntroContainer>
      </IntroWrapper>

      <ScrollSpy
        sections={sections}
        firstSectionTop={rect?.y}
        offset={-450}
        titleComponent={SectionTitleDesktop}
      />

      {/* Chi Siamo */}
      <HomeSectionWrapper>
        <HomeSection id="about" ref={ref}>
          <SectionTitleMobile>
            {lang === 'en' ? 'About' : 'Chi Siamo'}
          </SectionTitleMobile>
          <AppearingText component={Bio} stringLengths={[22, 40, 30]}>
            {homeData.bio[lang]}
          </AppearingText>
          <ParallaxImage image={homeData.secondaImmagine.localFile.publicURL} />

          <StyledButtonLink to="#">
            {lang === 'en' ? 'Continue' : 'Continua'}
          </StyledButtonLink>
        </HomeSection>
      </HomeSectionWrapper>

      {/* Servizi */}

      <ServiziHomePreview id="services" lang={lang} />

      {/* Clienti */}

      <HomeSectionWrapper>
        <HomeSection id="clients">
          <SectionTitleMobile>
            {lang === 'en' ? 'Clientis' : 'Clienti'}
          </SectionTitleMobile>
          <AppearingSectionSubtitle maxStrLength={39} component={Bio}>
            {homeData.clients.titolo[lang]}
          </AppearingSectionSubtitle>

          <ClientList>
            <>
              {clients.map(client => (
                <LiftedLink to="#" key={client.titolo[lang]}>
                  {client.titolo[lang]}
                </LiftedLink>
              ))}
            </>
          </ClientList>

          <SeeAllClients to="#">
            <h5>
              {lang === 'en' ? 'See all clients' : 'Scopri tutti i clienti'}
            </h5>
            <StyledArrowRight />
          </SeeAllClients>
        </HomeSection>
      </HomeSectionWrapper>

      <NewsList news={news} title={homeData.news.titolo[lang]} />
    </Layout>
  )
}
