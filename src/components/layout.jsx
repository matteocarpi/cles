import * as React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
${reset}
`

const defaultTheme = {
  black: '#000000',
}
export default function Layout({ children }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle>
        <main>{children}</main>
      </GlobalStyle>
    </ThemeProvider>
  )
}
