import * as React from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { motion } from 'framer-motion'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { stripHTML } from '../utils'

import ArrowDown from '../assets/arrow-down.svg'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SmallText from '../components/SmallText'
import AppearingText from '../components/AppearingText'
import MenuText from '../components/MenuText'
import Video from '../components/Video'
import ButtonLink from '../components/ButtonLink'
import ServiziHomePreview from '../components/ServiziHomePreview'
import WatchAllNews from '../components/WatchAllNews'
import ArrowRight from '../assets/arrow-right.svg'

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
`

const HomeSection = styled.section`
  border-top: solid 1px ${({ theme }) => theme.gray};
  width: 100%;
  max-width: 800px;
  margin-left: auto;

  @media (min-width: 768px) {
    border: none;
    margin-top: 200px;
  }
`

const SectionTitleMobile = styled(MenuText)`
  @media (min-width: 768px) {
    display: none;
  }
`

const Bio = styled.h3``

const StyledVideo = styled(Video)`
  margin: -2rem 0;

  @media (min-width: 768px) {
    margin: 0;
  }
`

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
`

const NewsList = styled.section``

const NewsPreview = styled.article`
  border: solid 5px ${({ theme }) => theme.yellow};
  padding: 24px;
  margin-bottom: 40px;
`

const NewsDate = styled(SmallText)`
  padding-bottom: 40px;
`

const NewsTitle = styled.h5`
  margin: 40px 0;
`

const NewsExcerpt = styled.p``

const ReadMore = styled(Link)`
  color: ${({ theme }) => theme.yellow};
  &:visited {
    color: ${({ theme }) => theme.yellow};
  }
  font-weight: 600;
  text-decoration: underline;
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
                  gatsbyImageData(width: 200)
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

      {/* Chi Siamo */}

      <HomeSectionWrapper>
        <HomeSection id="about">
          <SectionTitleMobile>
            {lang === 'en' ? 'About' : 'Chi Siamo'}
          </SectionTitleMobile>
          <Bio>{homeData.bio[lang]}</Bio>
          <StyledVideo url={homeData.video[lang]} />

          <ButtonLink to="#">
            {lang === 'en' ? 'Continue' : 'Continua'}
          </ButtonLink>
        </HomeSection>
      </HomeSectionWrapper>

      {/* Servizi */}

      <ServiziHomePreview lang={lang} />

      {/* Clienti */}

      <HomeSectionWrapper>
        <HomeSection>
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
            <ArrowRight />
          </SeeAllClients>
        </HomeSection>
      </HomeSectionWrapper>

      <HomeSectionWrapper dark>
        <HomeSection>
          <SectionTitleMobile>News</SectionTitleMobile>
          <Bio>{homeData.news.titolo[lang]}</Bio>

          <NewsList>
            {news.map(n => (
              <NewsPreview key={n.id}>
                <NewsDate>{n.date}</NewsDate>
                <NewsTitle>{n.title}</NewsTitle>
                <NewsExcerpt>{`${stripHTML(n.excerpt)}...`}</NewsExcerpt>
                <ReadMore to="#">Leggi Tutto</ReadMore>
              </NewsPreview>
            ))}
          </NewsList>
        </HomeSection>

        <WatchAllNews />
      </HomeSectionWrapper>
    </Layout>
  )
}