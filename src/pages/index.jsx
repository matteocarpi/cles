import * as React from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import AppearingText from '../components/AppearingText'

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1 style={{ textAlign: 'center', width: '100%' }}>Home</h1>
    <AppearingText>Look how I slide in!</AppearingText>
  </Layout>
)

export default IndexPage
