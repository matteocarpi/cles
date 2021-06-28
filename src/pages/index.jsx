import React from // , { useEffect }
'react'

// import { navigate } from 'gatsby'

import Home from '../components/Home'

const defaultLang = 'it'

const IndexPage = () => (
  // const isBrowser = typeof window !== 'undefined'

  // const locale = isBrowser && (navigator.language || navigator.userLanguage)

  // const lang = isBrowser && locale.substring(0, 2)

  // useEffect(
  //   () => isBrowser && navigate(lang === defaultLang ? '/' : `/${lang}`),
  //   [isBrowser, lang],
  // )

  <Home lang={defaultLang} />
)

export default IndexPage
