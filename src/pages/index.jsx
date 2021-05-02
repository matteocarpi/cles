import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import AppearingText from '../components/AppearingText'

const Rectangle = styled.div`
  height: 100vh;
  width: 100%;
  background-color: red;
`
const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1 style={{ textAlign: 'center', width: '100%' }}>Home</h1>
    <AppearingText>Look how I slide in!</AppearingText>
    <Rectangle />
    <AppearingText>Look how I slide in!</AppearingText>
  </Layout>
)

export default IndexPage
