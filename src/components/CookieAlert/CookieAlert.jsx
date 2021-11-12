import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery, navigate } from 'gatsby'
import useLang from '../../hooks/useLang'

import CloseIcon from '../../assets/close.svg'
import LightButton from '../LightButton'
import SmallText from '../SmallText'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: ${({ theme }) => theme.yellow};
  padding: 40px 20px;
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

  button {
    &:not(:last-child) {
      margin-bottom: 10px;
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
        <LightButton onClick={() => onAcceptCookies()}>
          {acceptText[lang]}
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

        <LightButton
          onClick={() =>
            navigate(
              lang === 'it' ? '/cookies-policy' : `/${lang}/cookies-policy`,
            )
          }
        >
          Cookies Policy
        </LightButton>
      </Actions>
    </Container>
  )
}
