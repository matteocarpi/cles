import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery, navigate } from 'gatsby'
import useLang from '../../hooks/useLang'

import CloseIcon from '../../assets/close.svg'
import LightButton from '../LightButton'
import SmallText from '../SmallText'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;

  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    bottom: 60px;
  }
`

const Container = styled.div`
  max-width: 670px;
  background-color: ${({ theme }) => theme.yellow};
  padding: 40px 20px;

  @media (min-width: 768px) {
    padding: 40px 30px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`

const Text = styled.article`
  text-transform: uppercase;
`

const CloseButton = styled.button`
  svg {
    path {
      stroke: ${({ theme }) => theme.black};
    }
  }
`

const Actions = styled.div`
  margin: auto;
  margin-top: 40px;
  text-align: center;

  @media (min-width: 768px) {
    display: flex;
    button {
      &:not(:last-child) {
        margin-right: 20px;
        margin-bottom: 0;
      }
    }
  }
`

export default function CookieAlert({ onAcceptCookies }) {
  const { lang } = useLang()

  const acceptText = {
    it: 'Accetto',
    en: 'Accept',
  }

  const data = useStaticQuery(graphql`
    query CookieBanner {
      wpPage(id: { eq: "cG9zdDoxNjI=" }) {
        homeData {
          cookieAlert {
            it
            en
          }
        }
      }
    }
  `)

  return (
    <Wrapper>
      <Container>
        <Header>
          <SmallText>WE USE COOKIES</SmallText>
          <CloseButton type="button" onClick={() => onAcceptCookies()}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Text
          dangerouslySetInnerHTML={{
            __html: data.wpPage.homeData.cookieAlert[lang],
          }}
        />

        <Actions>
          <LightButton highlight onClick={() => onAcceptCookies()}>
            {acceptText[lang]}
          </LightButton>

          <LightButton
            onClick={() =>
              navigate(
                lang === 'it' ? '/cookies-policy' : `/${lang}/cookies-policy`,
              )
            }
          >
            Cookies Policy
          </LightButton>

          <LightButton
            onClick={() =>
              navigate(
                lang === 'it' ? '/privacy-policy' : `/${lang}/privacy-policy`,
              )
            }
          >
            Privacy Policy
          </LightButton>
        </Actions>
      </Container>
    </Wrapper>
  )
}
