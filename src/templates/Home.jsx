import React from 'react'
import HomeComponent from '../components/Home'

export default function Home({ pageContext }) {
  const { lang } = pageContext

  return <HomeComponent lang={lang} />
}
