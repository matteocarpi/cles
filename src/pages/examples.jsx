import * as React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import AppearingText from '../components/AppearingText'
import SlidingImages from '../components/SlidingImages/SlidingImages'

const Rectangle = styled.div`
  height: 100vh;
  width: 100%;
  background-color: salmon;
`

export default function examples() {
  return (
    <Layout>
      <AppearingText>Look how I slide in!</AppearingText>
      <Rectangle />
      <AppearingText>Look how I slide in!</AppearingText>
      <SlidingImages />
    </Layout>
  )
}
