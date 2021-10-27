import React from 'react'
import styled from 'styled-components'

import { ParallaxBanner } from 'react-scroll-parallax'

const Image = styled(ParallaxBanner)`
  margin: 40px 0;
`

export default function ParallaxImage({ image }) {
  return (
    <Image
      layers={[
        {
          image,
          amount: 0.2,
        },
      ]}
      style={{
        height: '500px',
      }}
    />
  )
}
