import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import LangProvider from '../LangContext'

import Header from './Header'
import Footer from './Footer'
import Seo from './Seo'

const Container = styled.main``
const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: Poppins;
    color: ${({ theme }) => theme.black};
    background-color: ${({ theme }) => theme.white};
  }

  h1 {
    font-size: 48px;
    line-height: 54px;
    letter-spacing: -0.03em;

    @media(min-width: 768px) {
      font-size: 68px;
      line-height: 80px;
    }
  }

  h2 {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.03em;
    font-weight: 300;

    @media(min-width: 768px ) {
      font-size: 60px;
      line-height: 72px;
    }
  }

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.05em;
    margin-bottom: 40px;

    @media(min-width: 768px ) {
      font-size: 48px;
      line-height: 56px;
    }
  }

  h4 {
    font-size: 24px;
    line-height: 28px;
    font-weight: 400;
    letter-spacing: -0.02em;


    @media(min-width: 768px ) {
      font-size: 32px;
      line-height: 40px;
    }
  }

  h4 {
    font-size: 24px;
    line-height: 28px;
    letter-spacing: -0.02em;


    @media(min-width: 768px ) {
      font-size: 32px;
      line-height: 40px;
    }
  }

  h5 {
    font-size: 22px;
    line-height: 26px;
    letter-spacing: -0.02em;


    @media(min-width: 768px ) {
      font-size: 28px;
      line-height: 32px;
    }
  }

  h6 {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 56px;
  }

  strong {
    font-weight: 600;
  }

  button {
    border: none;
    background-color: transparent;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.black};
    &:visited {
      color: inherit;
    }
  }
`

const defaultTheme = {
  black: '#1D1D1B',
  white: '#F6F3EA',
  halfWhite: 'rgba(246, 243, 234, 0.7)',
  yellow: '#FFCD1C',
  gray: '#8C8A89',
  red: '#AE474B',
}

export default function Layout({ lang, children }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <LangProvider lang={lang}>
        <Seo lang={lang} />
        <GlobalStyle />
        <Header />
        <Container>{children}</Container>
        <Footer />
      </LangProvider>
    </ThemeProvider>
  )
}
