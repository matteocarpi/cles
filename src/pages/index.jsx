import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import AppearingText from '../components/AppearingText'
import SlidingImages from '../components/SlidingImages/SlidingImages'

const Rectangle = styled.div`
  height: 100vh;
  width: 100%;
  background-color: salmon;
`

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1 style={{ textAlign: 'center', width: '100%' }}>Home</h1>
    <AppearingText>Look how I slide in!</AppearingText>
    <Rectangle />
    <AppearingText>Look how I slide in!</AppearingText>
    <SlidingImages />
  </Layout>
)

export default IndexPage
