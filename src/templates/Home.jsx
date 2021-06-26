import * as React from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { motion } from 'framer-motion'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Scrollspy from 'react-scrollspy'

import ArrowDown from '../assets/arrow-down.svg'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SmallText from '../components/SmallText'
import AppearingText from '../components/AppearingText'
import Video from '../components/Video'
import ButtonLink from '../components/ButtonLink'
import ServiziHomePreview from '../components/ServiziHomePreview'
import ArrowRight from '../components/Arrow'
import NewsList from '../components/NewsList'
import SectionTitleMobile from '../components/SectionTitleMobile'

const IntroWrapper = styled.section`
  width: 100%;
  height: 100vh;
`

const IntroContainer = styled(BackgroundImage)`
  width: 100%;
  height: calc(100vh - 100px);
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 74px;

  @media (min-width: 768px) {
    min-height: 500px;
  }
`

const Slogan = styled(motion.h1)`
  max-width: 900px;
  text-align: center;
  color: ${({ theme }) => theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

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
  @media (min-width: 768px) {
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
    padding-left: 40px;
    padding-right: 40px;
  }
`

const HomeSection = styled.section`
  border-top: solid 1px ${({ theme }) => theme.gray};
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  @media (min-width: 768px) {
    border: none;
    margin-top: 200px;
    padding: 0;
  }
`

const Bio = styled(motion.h3)``

const ClientList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 56px;
`

const Client = styled(GatsbyImage)`
  width: 45%;
  max-height: 50px;
  margin: 1rem 0;

  @media (min-width: 768px) {
    width: 30%;
    max-width: 250px;
    max-height: unset;
  }
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

const SectionTitleWrapper = styled.div`
  overflow: hidden;

  &.section-title {
    ${SectionTitleDesktop} {
      display: none;
    }
  }
  &.active {
    ${SectionTitleDesktop} {
      display: block;
      animation: fadeIn 0.5s ease-in-out;
    }
  }

  @keyframes fadeIn {
    0% {
      transform: translateY(150px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

const SectionTitleDesktop = styled.h2`
  ${({ light, theme }) =>
    light &&
    css`
      color: ${theme.white};
    `}
`

const ScrollSpyContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  @media (max-width: 767px) {
    display: none;
  }
`

const StyledArrowRight = styled(ArrowRight)`
  max-width: 30px;

  @media (min-width: 768px) {
    max-width: 50px;
  }
`

export default function Home({ pageContext }) {
  const { lang } = pageContext

  const data = useStaticQuery(graphql`
    query HomeQuery {
      wpPage(id: { eq: "cG9zdDoyMw==" }) {
        homeData {
          title {
            en
            it
          }
          immagine {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          slogan {
            en
            it
          }
          bio {
            it
            en
          }
          video {
            en
            it
          }
          servizi {
            titolo {
              it
              en
            }
            descrizione {
              it
              en
            }
          }
          clienti {
            titolo {
              it
              en
            }
            loghi {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 400, pngOptions: { quality: 100 })
                }
              }
            }
          }
          news {
            titolo {
              it
              en
            }
          }
        }
      }
      allWpPost(limit: 3) {
        edges {
          node {
            id
            title
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 1920)
                  }
                }
              }
            }
            slug
            excerpt
            date(formatString: "DD.MM.YYYY")
            newsData {
              tradotta
              en {
                titolo
                contenuto
              }
            }
          }
        }
      }
    }
  `)

  const { homeData } = data.wpPage

  const clients = homeData.clienti.loghi.map(logo => getImage(logo.localFile))

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
    <Layout lang={lang}>
      <Seo title={data.wpPage.homeData.title[lang]} />
      <IntroWrapper>
        <IntroContainer
          fluid={homeData.immagine.localFile.childImageSharp.fluid}
        >
          <AppearingText numberOfLines={5} component={Slogan}>
            {homeData.slogan[lang]}
          </AppearingText>
          <ScrollDown to={lang === 'en' ? '/en#about' : '#about'}>
            <SmallText>Scroll Down</SmallText>
            <Arrow />
          </ScrollDown>
        </IntroContainer>
      </IntroWrapper>

      <ScrollSpyContainer>
        <Scrollspy
          items={['about', 'services', 'clients', 'news']}
          currentClassName="active"
          offset={-200}
        >
          <SectionTitleWrapper className="section-title">
            <SectionTitleDesktop>
              {lang === 'en' ? 'About' : 'Chi Siamo'}
            </SectionTitleDesktop>
          </SectionTitleWrapper>
          <SectionTitleWrapper className="section-title">
            <SectionTitleDesktop>
              {lang === 'en' ? 'Services' : 'Servizi'}
            </SectionTitleDesktop>
          </SectionTitleWrapper>
          <SectionTitleWrapper className="section-title">
            <SectionTitleDesktop>
              {lang === 'en' ? 'Clients' : 'Clienti'}
            </SectionTitleDesktop>
          </SectionTitleWrapper>
          <SectionTitleWrapper className="section-title">
            <SectionTitleDesktop light>
              {lang === 'en' ? 'News' : 'News'}
            </SectionTitleDesktop>
          </SectionTitleWrapper>
        </Scrollspy>
      </ScrollSpyContainer>

      {/* Chi Siamo */}

      <HomeSectionWrapper>
        <HomeSection id="about">
          <SectionTitleMobile>
            {lang === 'en' ? 'About' : 'Chi Siamo'}
          </SectionTitleMobile>
          <AppearingText numberOfLines={1} component={Bio} maxStrLength={40}>
            {homeData.bio[lang]}
          </AppearingText>
          <Video url={homeData.video[lang]} />

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
          <Bio>{homeData.clienti.titolo[lang]}</Bio>

          <ClientList>
            <>
              {clients.map(client => (
                <Client
                  key={client.images.fallback.src}
                  alt=""
                  image={client}
                  objectFit="contain"
                />
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
