import * as React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
${reset}

h1 {
  font-size: 60px;
  font-weight: bold;
}
`

const defaultTheme = {
  black: '#000000',
}
export default function Layout({ children }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <main>{children}</main>
    </ThemeProvider>
  )
}
