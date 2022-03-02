import React from 'react'
import styled from 'styled-components'

import { Parallax } from 'react-parallax'

const Image = styled(Parallax)`
  margin: 40px 0;
`

const Spacer = styled.div`
  width: 100%;
  padding-top: 56.25%;
`
export default function ParallaxImage({ image }) {
  return (
    <Image bgImage={image} strength={-30}>
      <Spacer />
    </Image>
  )
}
