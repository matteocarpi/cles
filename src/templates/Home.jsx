import React from 'react'
import HomeComponent from '../components/Home'

export default function Home({ pageContext }) {
  const { lang, location } = pageContext

  return <HomeComponent lang={lang} location={location} />
}
