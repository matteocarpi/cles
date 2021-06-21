import React, { useEffect } from 'react'

import { navigate } from 'gatsby'

const IndexPage = () => {
  const isBrowser = typeof window !== 'undefined'

  const locale = isBrowser && (navigator.language || navigator.userLanguage)

  const lang = locale.substring(0, 2)

  useEffect(() => {
    navigate(`/${lang}`)
  }, [lang])

  return <div>loading...</div>
}

export default IndexPage
