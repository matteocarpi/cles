import React, { useEffect } from 'react'

import { navigate } from 'gatsby'

const IndexPage = () => {
  const isBrowser = typeof window !== 'undefined'

  const locale = isBrowser && (navigator.language || navigator.userLanguage)

  const lang = isBrowser && locale.substring(0, 2)

  useEffect(() => isBrowser && navigate(`/${lang}`), [isBrowser, lang])

  return <div>loading...</div>
}

export default IndexPage
